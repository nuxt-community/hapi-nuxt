# hapi-nuxt

[![Greenkeeper badge](https://badges.greenkeeper.io/nuxt-community/hapi-nuxt.svg)](https://greenkeeper.io/)

> [Nuxt.js](https://nuxtjs.org) plugin for [Hapi.js](https://hapijs.com/)

[![npm](https://img.shields.io/npm/dt/hapi-nuxt.svg?style=flat-square)](https://npmjs.com/package/hapi-nuxt)
[![npm release](https://img.shields.io/npm/v/hapi-nuxt/latest.svg?style=flat-square)](https://npmjs.com/package/hapi-nuxt)
[![CircleCI](https://img.shields.io/circleci/project/github/nuxt-community/hapi-nuxt.svg?style=flat-square)](https://circleci.com/gh/nuxt-community/hapi-nuxt)

## Quick start

Install plugin:

```bash
yarn add hapi-nuxt # or npm install hapi-nuxt
```

Register it on your server:

```js
const Hapi = require('hapi')
const HapiNuxt = require('hapi-nuxt')

server = new Hapi.Server()

server.register(HapiNuxt, () => {
    // ...
})
```

By default this plugin tries to read `nuxt.config.js` from current directory and pass it as options. 
You can either provide a new path by setting options to an string value or directly passing options

```js
server.register({
    register: HapiNuxt
    options: {
        // Nuxt options       
    }
}, () => {
    // ...
})
```

If `nuxt.options.dev` (Automatically set by nuxt if not provided in options) is `true` plugin automatically starts a `Builder` allow to hot reload on dev. You can manually disable this behavior by using `options.startOnly` to `true`.

## Access `nuxt` and `builder` instances

Plugin exposes nuxt and builder (for dev only) instances to hapi. 

```js
server = new Hapi.Server()

server.register(HapiNuxt, () => {
    // Example to access nuxt and builder
    const { nuxt, builder } = server.plugins.nuxt
})
```

# License

MIT - Fandogh & Nuxt.js