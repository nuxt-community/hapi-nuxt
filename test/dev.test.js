const { join } = require('path')
const { Server } = require('@hapi/hapi')
const { Builder } = require('nuxt-edge')
const getPort = require('get-port')
const hapiNuxt = require('..')

Builder.prototype.build = jest.fn(() => Promise.resolve())

let server, port

const options = {
  srcDir: join(__dirname, 'fixture'),
  edge: true,
  dev: true
}

describe('dev', () => {
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

  test('setup dev server', () => {
    expect(Builder.prototype.build).toBeCalled()
  })
})
