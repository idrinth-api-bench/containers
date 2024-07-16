import {
  rmSync,
  writeFileSync,
} from 'fs';
import exec from './src/exec.js';
import readline from 'readline';
import {
  EXIT_SUCCESS,
} from './src/constants.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
},);
rl.question('Versions(space separated): ', (versions,) => {
  rl.question('Docker password: ', (password,) => {
    writeFileSync('./pw', password,);
    exec('cat pw | docker login -u idrinth --password-stdin', true,);
    rmSync('./pw',);
    rl.question('Images(space separated): ', (images,) => {
      for (const image of images.split(' ',)) {
        for (const version of versions.split(' ',)) {
          if (version && version.match(/^\d+\.\d+\.\d+$/u,)) {
            const main = version.replace(/\..+$/u, '',);
            const feature = version.replace(/\.[^.]+$/u, '',);
            const hash = exec('git rev-parse --short HEAD',);
            const args = [
              `--build-arg="BUILD_VERSION=${ version }"`,
              `--build-arg="BUILD_TIME=${ new Date().toISOString() }"`,
              `--build-arg="BUILD_HASH=${ hash.replace(/\s+/ug, '') }"`,
            ];
            const tags = [
              `-t idrinthapibench/${ image }:latest`,
              `-t idrinthapibench/${ image }:${ version }`,
              `-t idrinthapibench/${ image }:${ feature }`,
              `-t idrinthapibench/${ image }:${ main }`,
            ];
            const params = [
              ...args,
              ...tags,
            ];
            exec(
              `docker build ${ params.join(' ',) } ${ image }`,
              true,
            );
          }
        }
        exec(`docker push -a idrinthapibench/${ image }`, true,);
      }
      exec('docker image prune --force', true,);
      process.exit(EXIT_SUCCESS,);
    },);
  },);
},);
