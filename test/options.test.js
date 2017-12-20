const { Server } = require('hapi')
const hapiNuxt = require('..')


describe('options', () => {

    const port = 5060

    test('nuxt.config.js', async () => {
        server = new Server({ port })

        await server.register({
            plugin: hapiNuxt,
            options: __dirname + '/fixture/nuxt.config.js'
        })

        expect(server.plugins.nuxt.nuxt.options.test).toBe(123)
    })

})
