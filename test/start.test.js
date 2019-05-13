const path = require('path')
const { Server } = require('@hapi/hapi')
const axios = require('axios')
const { Builder, Nuxt } = require('nuxt-edge')
const hapiNuxt = require('..')

describe('start', () => {
  let server
  const port = 5060
  const get = uri => axios.get(`http://localhost:${port}${uri}`).then(res => res.data)

  const options = {
    rootDir: path.join(__dirname, 'fixture'),
    dev: false,
    edge: true
  }

  it('build', async () => {
    const nuxt = new Nuxt(options)
    await new Builder(nuxt).build()
  }, 60000)

  it('setup server', async () => {
    server = new Server({ port })

    // Add test API route
    server.route({
      path: '/api',
      method: 'GET',
      handler(request, h) {
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
  })

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
