const { Server } = require('hapi')
const axios = require('axios')
const hapiNuxt = require('..')


describe('dev', () => {

    let server
    const port = 5060
    const get = uri => axios.get(`http://localhost:${port}${uri}`).then(res => res.data)
    const options = { srcDir: __dirname + '/fixture' }

    beforeAll(async () => {
        server = new Server()
        server.connection({ port })

        server.route({
            path: '/api',
            method: 'GET',
            handler(request, reply) {
                reply({ api: 'works!' })
            }
        })

        // Register plugin
        await server.register({ register: hapiNuxt, options })

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

    test('/', async() => {
        let r = await get('/')
        expect(r).toContain('Hello Nuxt!')
    })

})