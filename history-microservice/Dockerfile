ARG BUILD_VERSION

FROM node:21.7.3-alpine AS node
FROM node:21.7.3-alpine AS build

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

RUN git clone https://github.com/idrinth-api-bench/history-microservice.git \
    && npm ci \
    && npm run tsc \
    && npm prune --production \
    && (rm /api-bench/history-microservice/README.md || true) \
    && (rm /api-bench/history-microservice/src/**/*.ts || true) \
    && (rm /api-bench/history-microservice/src/**/*.ts || true) \
    && clean-modules clean --yes \
    && mkdir -p /project/@idrinth/api-bench/history-microservice \
    && cp --recursive /api-bench/history-microservice/* /project/@idrinth/api-bench/history-microservice/ \
    && cp /api-bench/history-microservice/.env /project/@idrinth/api-bench/history-microservice/

WORKDIR /project
COPY --from=build /project/@idrinth/api-bench/history-microservice /project

EXPOSE 80

ENTRYPOINT ["node", "/project/index.js"]
