const { Server } = require('hapi')

const Routes = require('./api')
const hapiNuxt = require('..') // 'hapi-nuxt'

async function start () {
    const server = new Server({ port: 3000 })

    await server.register(hapiNuxt)

    await server.route(Routes)

    await server.start()
}

start().catch(console.error)
