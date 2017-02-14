const H2O2 = require('h2o2');
const Inert = require('inert');
const Path = require('path');
const Nuxt = require('./nuxt');

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

            // General assets route definer
            const asset = (base_path, route_id, files_dir) => {
                server.route({
                    method: 'GET',
                    path: base_path + '/{path*}',
                    config: {
                        id: 'NuxtController.' + route_id,
                        auth: false,
                    },
                    handler: {
                        directory: {
                            path: files_dir
                        }
                    }
                });
            };

            // Static Assets
            asset('/static', 'static', Path.resolve(nuxt.options.srcDir, 'static'));

            // _nuxt handler for production
            if (!nuxt.options.dev) {
                asset('/_nuxt', '_nuxt', Path.resolve(nuxt.options.rootDir, '.nuxt/dist'));
            }

            // Vendor Assets
            asset('/vendor', 'vendor', Path.resolve(nuxt.options.rootDir, 'node_modules'));

            // API Proxy
            // Ensure API_URL on env is same as config
            if (config.api_url) process.env.API_URL = config.api_url;
            let API_URL = process.env.API_URL;

            if (API_URL) {
                console.log("Redirect /api requests to " + API_URL);

                server.route({
                    method: '*',
                    path: '/api/{path*}',
                    config: {
                        id: 'NuxtController.api_proxy',
                        auth: false,
                    },
                    handler: {
                        proxy: {
                            uri: API_URL + '{path}',
                            passThrough: true,
                            rejectUnauthorized: false,
                            xforward: false,
                            redirects: false,
                            timeout: 30000
                        }
                    }
                });
            }

            // Nuxt handler
            server.route({
                method: '*', // Don't set to get as it overrides API proxy route!
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
        });

    }
};

NuxtPlugin.register.attributes = {
    pkg: require('../package.json'),
    dependencies: ['h2o2', 'inert']
};

module.exports = NuxtPlugin;

