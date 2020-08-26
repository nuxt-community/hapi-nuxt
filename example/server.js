const { Server } = require('@hapi/hapi')
const nuxtPlugin = require('..')
const Routes = require('./api')

async function start () {
  const server = new Server({ port: 3000 })

  await server.register({
    plugin: nuxtPlugin,
    options: {
      edge: true,
      rootDir: __dirname
    }
  })

  await server.route(Routes)

  await server.start()

  console.log('Hapi server listening on http://localhost:3000')
}

start().catch(console.error)
