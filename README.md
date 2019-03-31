# hapi-nuxt

[![npm](https://img.shields.io/npm/dt/hapi-nuxt.svg?style=flat-square)](https://npmjs.com/package/hapi-nuxt)
[![npm release](https://img.shields.io/npm/v/hapi-nuxt/latest.svg?style=flat-square)](https://npmjs.com/package/hapi-nuxt)
[![CircleCI](https://img.shields.io/circleci/project/github/nuxt-community/hapi-nuxt.svg?style=flat-square)](https://circleci.com/gh/nuxt-community/hapi-nuxt)
[![Codecov](https://img.shields.io/codecov/c/github/nuxt-community/hapi-nuxt.svg?style=flat-square)](https://codecov.io/gh/nuxt-community/hapi-nuxt)
[![Greenkeeper badge](https://img.shields.io/badge/greenkeepr-enabled-green.svg?style=flat-square)](https://greenkeeper.io/)
[![dependencies Status](https://david-dm.org/expressjs/express/status.svg?style=flat-square)](https://david-dm.org/expressjs/express)

> [Nuxt.js](https://nuxtjs.org) plugin for [Hapi.js](https://hapijs.com/)

**IMPORTANT:** This plugin is only compatible with Hapi >= 17

## Quick start

Install plugin:

```bash
yarn add hapi-nuxt # or npm install hapi-nuxt
```

Register it on your server:

```js
const Hapi = require('hapi')
const nuxtPlugin = require('hapi-nuxt')

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
server = new Hapi.Server()

await server.register(HapiNuxt)

// Access to nuxt and builder instances using server.plugins.nuxt
const { nuxt, builder } = server.plugins.nuxt
```

# License

MIT
