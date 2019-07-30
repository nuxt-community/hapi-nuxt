const { join } = require('path')
const { Server } = require('@hapi/hapi')
const { Builder, Nuxt } = require('nuxt-edge')
const axios = require('axios')
const getPort = require('get-port')
const hapiNuxt = require('..')

let server, port
const get = uri => axios.get(`http://localhost:${port}${uri}`).then(res => res.data)

const options = {
  rootDir: join(__dirname, 'fixture'),
  dev: false,
  edge: true
}

describe('start', () => {
  beforeAll(async () => {
    const nuxt = new Nuxt(options)
    await nuxt.ready()
    await new Builder(nuxt).build()

    port = await getPort()
    server = new Server({ port })

    // Add test API route
    server.route({
      path: '/api',
      method: 'GET',
      handler (request, h) {
        return { api: 'works!' }
      }
    })

    // Register plugin
    await server.register({
      plugin: hapiNuxt,
      options
    })

    // Start server
    await server.start()
  }, 60000)

  afterAll(async () => {
    await server.stop()
  })

  test('api', async () => {
    const r = await get('/api')
    expect(r.api).toBe('works!')
  })

  test('/', async () => {
    const r = await get('/')
    expect(r).toContain('Hello Nuxt!')
  })
})
