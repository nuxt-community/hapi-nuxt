module.exports = {

    dev: process.env.NODE_ENV !== 'production',

    head: {
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        ],
        link: []
    },

    build: {
        filenames: {
            css: 'app.css', // default: style.css
            vendor: 'vendor.js', // default: vendor.bundle.js
            app: 'app.js' // default: nuxt.bundle.js
        },
    },

};

