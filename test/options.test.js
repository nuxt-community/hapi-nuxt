const { join } = require('path')
const { Server } = require('@hapi/hapi')
const getPort = require('get-port')
const hapiNuxt = require('..')

let server, port

const options = {
  rootDir: join(__dirname, 'fixture'),
  baseURL: 'api',
  dev: false,
  edge: false
}

describe('options', () => {
  beforeAll(async () => {
    port = await getPort()
    server = new Server({ port })

    // Register plugin
    await server.register({
      plugin: hapiNuxt,
      options
    })
  })

  afterAll(async () => {
    await server.stop()
  })

  test('nuxt.config.js', () => {
    expect(server.plugins.nuxt.nuxt.options.test).toBe(123)
  })
})
