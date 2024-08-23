FROM node:22.7.0-alpine AS build

ARG BUILD_VERSION

RUN apk add --no-cache git=2.45.2-r0 python3 make unixodbc
RUN npm install -g clean-modules@3.0.5 \
    && git clone --depth=1 https://github.com/idrinth-api-bench/framework.git /project \
    && cd /project \
    && git fetch origin --tags \
    && git checkout $BUILD_VERSION \
    && npm ci \
    && npm run language \
    && npm run tsc \
    && npm prune --production \
    && rm ./src/**/*.ts \
    && rm ./node_modules/**/*.ts \
    && rm ./README.md \
    && rm ./index.ts \
    && rm ./tsconfig.json \
    && rm ./LICENSE \
    && rm -r ./typings \
    && rm -r ./integration \
    && rm -r ./property \
    && rm -r ./test \
    && rm -r ./tools \
    && rm -r ./fixtures \
    && rm -r ./language \
    && clean-modules clean --yes

FROM node:22.7.0-alpine AS node

ARG BUILD_VERSION
ARG BUILD_TIME
ARG BUILD_HASH

LABEL author="Björn 'Idrinth' Büttner"
LABEL maintainer="webmaster@idrinth-api-ben.ch"
LABEL org.label-schema.name="idrinth/api-bench"
LABEL org.label-schema.description="An image prepared for api-bench usage via global install."
LABEL org.label-schema.url="https://idrinth-api-ben.ch"
LABEL org.label-schema.vcs-url="https://github.com/idrinth/api-bench"
LABEL org.label-schema.version=$BUILD_VERSION
LABEL org.label-schema.build-date=$BUILD_TIME
LABEL org.label-schema.vcs-ref=$BUILD_HASH
LABEL org.label-schema.schema-version="1.0"
LABEL org.label-schema.vendor="Björn 'Idrinth' Büttner"
LABEL org.opencontainers.image.created=$BUILD_TIME
LABEL org.opencontainers.image.authors="webmaster@idrinth-api-ben.ch"
LABEL org.opencontainers.image.url="https://idrinth-api-ben.ch"
LABEL org.opencontainers.image.documentation="https://idrinth-api-ben.ch"
LABEL org.opencontainers.image.source="https://github.com/idrinth/api-bench"
LABEL org.opencontainers.image.version=$BUILD_VERSION
LABEL org.opencontainers.image.revision=$BUILD_HASH
LABEL org.opencontainers.image.vendor="Björn 'Idrinth' Büttner"
LABEL org.opencontainers.image.licenses="MIT"
LABEL org.opencontainers.image.title="idrinth/api-bench"
LABEL org.opencontainers.image.description="An image prepared for api-bench usage via global install."

ENV IDRINTH_API_BENCH_VERSION=$BUILD_VERSION
ENV IDRINTH_API_BENCH_BUILT=$BUILD_TIME

COPY --from=build /project /usr/local/lib/node_modules/@idrinth-api-bench/framework/
RUN ln -s /usr/local/lib/node_modules/@idrinth-api-bench/framework/bin/iab.js /bin/iab \
    && chmod +x /bin/iab

WORKDIR /project
VOLUME /project
