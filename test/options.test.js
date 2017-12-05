const { Server } = require('hapi')
const hapiNuxt = require('..')


describe('options', () => {

    test('nuxt.config.js', () => {
        server = new Server({ port: 1234 })

        server.register({
            register: hapiNuxt,
            options: __dirname + '/fixture/nuxt.config.js'
        }, (err) => {
            if (err) throw err

            expect(server.plugins.nuxt.nuxt.options.test).toBe(123)
        })
    })

})
