const { Server } = require('hapi')
const axios = require('axios')
const hapiNuxt = require('..')
const { Builder, Nuxt } = require('nuxt')


describe('start', () => {

    let server
    const port = 5060
    const get = uri => axios.get(`http://localhost:${port}${uri}`).then(res => res.data)
    const options = { srcDir: __dirname + '/fixture', dev: false }

    beforeAll(async () => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000

        server = new Server({ port })

        server.route({
            path: '/api',
            method: 'GET',
            handler(request, h) {
                return { api: 'works!' }
            }
        })

        // Build before start
        let NODE_ENV = process.env.NODE_ENV
        process.env.NODE_ENV = 'production'
        await new Builder(new Nuxt(options)).build()
        process.env.NODE_ENV = NODE_ENV

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
        let r = await get('/api')
        expect(r.api).toBe('works!')
    })

    test('/', async () => {
        let r = await get('/')
        expect(r).toContain('Hello Nuxt!')
    })

})
