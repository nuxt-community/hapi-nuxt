process.env.NODE_ENV = 'production';

const nuxt = require('./nuxt');

nuxt().build().then(() => {
    process.exit(0);
});