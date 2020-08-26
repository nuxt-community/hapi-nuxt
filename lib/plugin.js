exports.register = async function (server, _config) {
  // Apply defaults
  const config = {
    dev: process.env.NODE_ENV !== 'production',
    rootDir: process.cwd(),
    edge: false,
    baseURL: null,
    route: {},
    routeMethod: '*',
    ..._config
  }

  // Requre Nuxt
  const { loadNuxt, getBuilder } = tryRequire('nuxt-edge') || tryRequire('nuxt')

  if (!loadNuxt) {
    throw new Error('Ensure nuxt or nuxt-edge >= 2.12 is instaled')
  }

  // Initialize nuxt
  const nuxt = await loadNuxt({
    rootDir: config.rootDir,
    configOverrides: config.overrides,
    for: config.dev ? 'dev' : 'start'
  })

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
      req.hapi = request
      res.hapi = h
      nuxt.render(req, res)

      // https://hapijs.com/api#h.abandon
      return h.abandon
    }
  })

  // Development mode
  if (config.dev) {
    const builder = await getBuilder(nuxt)
    server.expose('builder', builder)
    builder.build().catch(console.error)
  }
}

function tryRequire (pkg) {
  try {
    return require(pkg)
  } catch (err) {
  }
}

exports.name = 'nuxt'
exports.pkg = require('../package.json')
