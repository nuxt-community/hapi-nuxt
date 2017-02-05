const config = require('config');
const H2O2 = require('h2o2');
const Inert = require('inert');
const Path = require('path');
const Nuxt = require('./nuxt');
const Chalk = require('chalk');

// Config API Endpoint
// const api_config = config.get('api');
// process.env.ENDPOINT = `${api_config.protocol}://${api_config.host}:${api_config.port}`;

const NuxtPlugin = {
    register(server, config, next) {

        // Create nuxt instance
        const nuxt = Nuxt(config);

        // Register dependency plugins
        server.register([
            {register: H2O2},
            {register: Inert},

        ], (err) => {
            if (err) throw err;

            // Static Assets
            server.route({
                method: 'GET',
                path: '/static/{path*}',
                config: {
                    id: 'NuxtController.static',
                    auth: false,
                },
                handler: {
                    directory: {
                        path: Path.resolve(nuxt.options.srcDir, 'static')
                    }
                }
            });

            // Vendor Assets
            server.route({
                method: 'GET',
                path: '/vendor/{path*}',
                config: {
                    id: 'NuxtController.vendor',
                    auth: false,
                },
                handler: {
                    directory: {
                        path: Path.resolve(nuxt.options.rootDir, 'node_modules')
                    }
                }
            });

            // Nuxt handler
            server.route({
                method: '*',
                path: '/{path*}',
                config: {
                    id: 'NuxtController.render',
                    auth: false,
                },
                handler: function (request, reply) {
                    // if (request.path.indexOf('/_') !== 0)
                    // console.log(Chalk.green('[Nuxt]'), request.path);

                    let {req, res} = request.raw;
                    req._hapi = request;
                    res._hapi = reply;
                    nuxt.render(req, res);
                }
            });

            // Build bundle on dev
            if (process.env.NODE_ENV !== 'production') {
                console.log(Chalk.yellow("[Nuxt]"), "Building...");
                nuxt.build().then(() => {
                    if (next) next();
                }).catch((err) => {
                    console.error(err);
                });
            } else {
                if (next) next();
            }

        });

    }
};

NuxtPlugin.register.attributes = {
    name: 'bak-nuxt',
};

module.exports = NuxtPlugin;

