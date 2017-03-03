// Show logs
if (process.env.NODE_ENV !== 'production') {
    process.env.DEBUG = 'nuxt:*';
}

const fs = require('fs');
const Nuxt = require('nuxt');
const path = require('path');
const _ = require('lodash');

module.exports = function (config) {
    // Load nuxt.config.js
    const nuxt_config = require(path.resolve(config.rootDir, 'nuxt.config.js'));

    // Create nuxt instance using options
    return new Nuxt(nuxt_config);
};

