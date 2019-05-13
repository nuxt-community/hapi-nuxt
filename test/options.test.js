const path = require('path')
const { Server } = require('@hapi/hapi')
const hapiNuxt = require('..')

describe('options', () => {
  const port = 5060
  let server

  test('nuxt.config.js', async () => {
    server = new Server({ port })

    await server.register({
      plugin: hapiNuxt,
      options: {
        rootDir: path.join(__dirname, 'fixture'),
        edge: true,
        dev: false
      }
    })

    expect(server.plugins.nuxt.nuxt.options.test).toBe(123)
  })
})
