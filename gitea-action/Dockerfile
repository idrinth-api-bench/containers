ARG BUILD_VERSION

FROM node:22.10.0-alpine AS node

RUN apk add --no-cache "git=2.43.0-r0" && npm install -g clean-modules@3.0.5
RUN git clone --reference=$BUILD_VERSION https://github.com/idrinth-api-bench/framework.git /project
WORKDIR /project
RUN npm ci && npm run language && npm run tsc
RUN npm prune --production
RUN rm -r ./src ./node_modules ./README.md ./index.ts ./tsconfig.json ./LICENSE ./typings ./integration ./property ./test ./tools ./fixtures ./language
RUN clean-modules clean --yes

COPY --from=build /usr/lib /usr/lib
COPY --from=build /usr/local/lib /usr/local/lib
COPY --from=build /usr/local/include /usr/local/include
COPY --from=build /usr/local/bin /usr/local/bin

RUN mkdir -p /usr/local/lib/node_modules/@idrinth/api-bench

FROM gitea/act_runner:0.2.10 AS gitea

ARG BUILD_VERSION
ARG BUILD_TIME
ARG BUILD_HASH

LABEL author="Björn 'Idrinth' Büttner"
LABEL maintainer="webmaster@idrinth-api-ben.ch"
LABEL org.label-schema.name="idrinth/api-bench/gitea-action"
LABEL org.label-schema.description="A gitea action prepared for api-bench usage via global install."
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
LABEL org.opencontainers.image.title="idrinth/api-bench/gitea-action"
LABEL org.opencontainers.image.description="A gitea action prepared for api-bench usage via global install."

ENV IDRINTH_API_BENCH_VERSION=$BUILD_VERSION
ENV IDRINTH_API_BENCH_BUILT=$BUILD_TIME

COPY --from=node /usr/local/lib/node_modules/@idrinth/api-bench /usr/local/lib/node_modules/@idrinth-api-bench/gitea-action/

WORKDIR /project
