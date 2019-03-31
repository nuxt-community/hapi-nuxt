const path = require('path')
const { Server } = require('hapi')
const { Builder } = require('nuxt-edge')
const hapiNuxt = require('..')

Builder.prototype.build = jest.fn(() => Promise.resolve())

describe('dev', () => {
  let server
  const options = {
    srcDir: path.join(__dirname, 'fixture'),
    edge: true,
    dev: true
  }

  it('setup dev server', async () => {
    server = new Server()

    // Register plugin
    await server.register({
      plugin: hapiNuxt,
      options
    })

    // Expect builder.build to be called
    expect(Builder.prototype.build).toBeCalled()
  })

  afterAll(async () => {
    await server.stop()
  })
})
