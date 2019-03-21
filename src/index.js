const { resolve } = require('path')
const { Nuxt, Builder } = require('nuxt')

const NuxtPlugin = {

    name: 'nuxt',

    pkg: require('../package.json'),

    async register (server, config) {

        // If config is not provided try nuxt.config.js
        if (!config || Object.keys(config).length === 0) {
            config = 'nuxt.config.js'
        }

        // Resolve config location if is provided as string
        if(typeof config === 'string') {
            try {
                const path = resolve(process.cwd(), config)
                config = require(path)
            } catch (e) {
                // DO NOTHING
            }
        }

        // Create nuxt instance using options
        const nuxt = new Nuxt(config)
        await nuxt.ready();

        server.expose('nuxt', nuxt)

        // Nuxt handler
        server.route({
            method: 'GET',
            path: '/{path*}',
            config: {
                id: 'NuxtController.render',
                auth: false,
            },
            handler (request, h) {
                const {req, res} = request.raw

                nuxt.render(req, res)

                // https://hapijs.com/api#h.abandon
                return h.abandon
            }
        })

        // Dev
        if (nuxt.options.dev && nuxt.options.startOnly !== false) {
            // Build nuxt
            console.log('Building nuxt ...')
            const builder = new Builder(nuxt);
            server.expose('builder', builder);
            builder.build().catch(console.error)
        }
    }
}

module.exports = NuxtPlugin
