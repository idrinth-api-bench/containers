ARG BUILD_VERSION

FROM node:22.7.0-alpine AS build

RUN apk add --no-cache "git=2.43.0-r0" \
    && npm install -g clean-modules@3.0.5 \
    && git clone https://github.com/idrinth-api-bench/history-microservice /project \
    && cd /tmp/history-microservice \
    && npm ci \
    && npm run tsc \
    && npm prune --production \
    && rm -rf /tmp/history-microservice/{README.md,src/**/*.ts} \
    && clean-modules clean --yes

FROM node:22.7.0-alpine AS node

ARG BUILD_VERSION
ARG BUILD_TIME
ARG BUILD_HASH

LABEL author="Björn 'Idrinth' Büttner"
LABEL maintainer="webmaster@idrinth-api-ben.ch"
LABEL org.label-schema.name="idrinth/api-bench/history-microservice"
LABEL org.label-schema.description="A microservice prepared for monitoring api-bench results."
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
LABEL org.opencontainers.image.title="idrinth/api-bench/history-microservice"
LABEL org.opencontainers.image.description="A microservice prepared for monitoring api-bench results."

ENV IDRINTH_API_BENCH_VERSION=$BUILD_VERSION
ENV IDRINTH_API_BENCH_BUILT=$BUILD_TIME

WORKDIR /project
COPY --from=build /project /usr/local/lib/node_modules/@idrinth-api-bench/history-microservice

EXPOSE 80

ENTRYPOINT ["node", "/project/index.js"]
