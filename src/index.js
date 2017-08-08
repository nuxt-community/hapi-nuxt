const { resolve } = require('path')
const { Nuxt, Builder } = require('nuxt')

const NuxtPlugin = {
    register(server, config, next) {

        // If config is not provided try nuxt.config.js
        if (!config || Object.keys(config).length === 0) {
            config = 'nuxt.config.js'
        }

        // Resolve config location if is provided as string
        if(typeof config === 'string') {
            try {
                const path = resolve(process.cwd(), config)
                console.log(path)
                config = require(path)
            } catch (e) {
                // DO NOTHING
            }
        }

        // Create nuxt instance using options
        const nuxt = new Nuxt(config)
        server.expose('nuxt', nuxt)

        // Nuxt handler
        server.route({
            method: 'GET',
            path: '/{path*}',
            config: {
                id: 'NuxtController.render',
                auth: false,
            },
            handler (request, reply) {
                const {req, res} = request.raw

                // Inject Hapi standard request and reply
                req.request = request
                res.reply = reply

                // Render using nuxt.render
                nuxt.render(req, res)
            }
        })

        // Dev
        if (nuxt.options.dev && nuxt.options.startOnly !== false) {
            // Build nuxt
            const builder = new Builder(nuxt)
            server.expose('builder', builder)
            builder.build()
            .then(() => {
                next()
            })
            .catch((err) => {
                console.error(err)
            })
        } else {
            // Production
            next()
        }
    }
}

NuxtPlugin.register.attributes = {
    name: 'nuxt',
    pkg: require('../package.json')
}

module.exports = NuxtPlugin

