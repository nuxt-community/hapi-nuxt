const path = require('path')
const { Server } = require('hapi')
const hapiNuxt = require('..')

describe('options', () => {
  const port = 5060
  let server

  test('nuxt.config.js', async () => {
    server = new Server({ port })

    await server.register({
      plugin: hapiNuxt,
      options: path.join(__dirname, 'fixture/nuxt.config.js')
    })

    expect(server.plugins.nuxt.nuxt.options.test).toBe(123)
  })
})
