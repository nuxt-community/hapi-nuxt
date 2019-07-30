# Hapi Plugin for Nuxt.js

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Circle CI][circle-ci-src]][circle-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> [Nuxt.js](https://nuxtjs.org) plugin for [Hapi.js](https://hapijs.com/)

**IMPORTANT:** This plugin is compatible with Hapi >= 17

## Setup

1. Add `@nuxtjs/hapi` dependency to your project

```bash
yarn add @nuxtjs/hapi # or npm install @nuxtjs/hapi
```

2. Register it on your server:

```js
const Hapi = require('@hapi/hapi')
const nuxtPlugin = require('@nuxtjs/hapi')

await server.register({
  plugin: nuxtPlugin
  options: {
    // plugin options
  }
}
```

## Options

### `dev`

- Default: `true` (`false` when environment variable `NODE_ENV` is `production`)

Automatically starts a `Builder` allow to hot reload on dev. Should be disabled for production.

### `rootDir`

- Default: current working directory

### `nuxtConfig`

- Default: `nuxt.config.js`

Resolved relative to `rootDir`

### `edge`

- Default: `false`

Use `nuxt-edge` instead of `nuxt` package if set to `true`

### `baseURL`

- Default: `/`

baseURL for SSR route handler

### `route`

- Default: `{ id: 'nuxt.render', auth: false }`

Hapi route options for SSR handler

### `routeMethod`

- Default: `*`

Hapi route method. (Can be set to `GET` for more strict handling)

## Access `nuxt` and `builder` instances

This plugin exposes nuxt and builder (for dev only) instances to hapi.

```js
const server = new Hapi.Server()

await server.register(HapiNuxt)

// Access to nuxt and builder instances using server.plugins.nuxt
const { nuxt, builder } = server.plugins.nuxt
```

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) Nuxt Community

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@nuxtjs/hapi/latest.svg?style=flat-square
[npm-version-href]: https://npmjs.com/package/@nuxtjs/hapi

[npm-downloads-src]: https://img.shields.io/npm/dt/@nuxtjs/hapi.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/hapi

[circle-ci-src]: https://img.shields.io/circleci/project/github/nuxt-community/hapi-nuxt.svg?style=flat-square
[circle-ci-href]: https://circleci.com/gh/nuxt-community/hapi-nuxt

[codecov-src]: https://img.shields.io/codecov/c/github/nuxt-community/hapi-nuxt.svg?style=flat-square
[codecov-href]: https://codecov.io/gh/nuxt-community/hapi-nuxt

[license-src]: https://img.shields.io/npm/l/@nuxtjs/hapi.svg?style=flat-square
[license-href]: https://npmjs.com/package/@nuxtjs/hapi
