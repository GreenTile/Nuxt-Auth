const { resolve } = require('path')

const themeColor = 'red'

module.exports = {
  mode: 'spa',

  srcDir: __dirname,
  buildDir: resolve(__dirname, '.nuxt'),

  modules: [
    '@nuxtjs/auth',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    'bootstrap-vue/nuxt'
  ],

  plugins: [
    './plugins/bootstrap'
  ],

  manifest: {
    lang: 'en',
    name: 'music app',
    short_name: 'musicapp',
    description: 'best music app',
    theme_color: themeColor
  },

  proxy: [
    process.env.PROXY_API_URL || 'http://localhost:3000/api'
  ]
}
