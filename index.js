// Show logs
if (process.env.NODE_ENV !== 'production') {
    process.env.DEBUG = 'nuxt:*';
}

const fs = require('fs');
const Nuxt = require('nuxt');
const path = require('path');

const NuxtPlugin = {
    register(server, config, next) {

        // Create nuxt instance using options
        const nuxt = new Nuxt(config);
        server.nuxt = nuxt

        // Nuxt handler
        server.route({
            method: '*',
            path: '/{path*}',
            config: {
                id: 'NuxtController.render',
                auth: false,
            },
            handler: function (request, reply) {
                let {req, res} = request.raw;

                // Inject hapi standard request and reply
                req.request = request;
                res.reply = reply;

                // Render using nuxt.render
                nuxt.render(req, res);
            }
        });

        // Build bundle on dev
        if (nuxt.options.dev) {
            console.log("[Nuxt] Building...");
            nuxt.build().then(() => {
                next();
            }).catch((err) => {
                console.error(err);
            });
        } else {
            // Prod
            next();
        }
    }
};

NuxtPlugin.register.attributes = {
    pkg: require('./package.json')
};

module.exports = NuxtPlugin;

