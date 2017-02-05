// Show logs
process.env.DEBUG = 'nuxt:build';

const fs = require('fs');
const Nuxt = require('nuxt');
const Path = require('path');
const NuxtBase = require('./nuxt.config.base');
const _ = require('lodash');

module.exports = function (opts = {}) {

    // Base options
    let options = Object.assign({
        rootDir: opts.rootDir || '.',
    }, NuxtBase);

    // Try to load from nuxt.config.js
    const nuxtConfigFile = Path.resolve(options.rootDir, 'nuxt.config.js');

    if (fs.existsSync(nuxtConfigFile)) {
        let project_options = require(nuxtConfigFile);
        _.defaultsDeep(options, project_options);
    }

    // Override opts
    _.defaultsDeep(options, opts);

    // Create nuxt instance using options
    return new Nuxt(options);
};

