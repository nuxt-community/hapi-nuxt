const { resolve } = require('path')
const { existsSync } = require('fs')
const esm = require('esm')

exports.register = async function (server, _config) {
  // Apply defaults
  const config = {
    dev: process.env.NODE_ENV !== 'production',
    rootDir: process.cwd(),
    nuxtConfig: 'nuxt.config.js',
    edge: false,
    baseURL: null,
    route: {},
    routeMethod: '*',
    ..._config
  }

  // Requre Nuxt
  const { Nuxt, Builder } = require(config.edge ? 'nuxt-edge' : 'nuxt')

  // Resolve nuxt.config relative to rootDir
  config.nuxtConfig = resolve(config.rootDir, config.nuxtConfig)

  // Load config
  const requireESM = esm(module, {
    cache: false
  })
  const nuxtConfig = existsSync(config.nuxtConfig) ? requireESM(config.nuxtConfig) : {}

  // Set rootDir and dev
  nuxtConfig.rootDir = config.rootDir
  nuxtConfig.dev = config.dev

  // Create nuxt instance using options
  const nuxt = new Nuxt(nuxtConfig)

  // Await nuxt to be ready
  await nuxt.ready()

  // Expose nuxt
  server.expose('nuxt', nuxt)

  // Route handler
  server.route({
    method: config.routeMethod,
    path: config.baseURL ? `/${config.baseURL}/{path*}`.replace('//', '/') : '/{path*}',
    config: {
      id: 'nuxt.render',
      auth: false,
      ...config.route
    },
    handler (request, h) {
      const { req, res } = request.raw
      nuxt.render(req, res)

      // https://hapijs.com/api#h.abandon
      return h.abandon
    }
  })

  // Development mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    server.expose('builder', builder)
    builder.build().catch(console.error)
  }
}

exports.name = 'nuxt'
exports.pkg = require('../package.json')
