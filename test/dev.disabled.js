const path = require('path')
const { Server } = require('hapi')
const axios = require('axios')
const hapiNuxt = require('..')

describe('dev', () => {
  let server
  const port = 5060
  const get = uri => axios.get(`http://localhost:${port}${uri}`).then(res => res.data)
  const options = { srcDir: path.join(__dirname, 'fixture') }

  beforeAll(async () => {
    server = new Server({ port })

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
