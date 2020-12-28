const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  devIndicators: {
    autoPrerender: false,
  },
  pwa: {
    dest: 'public',
    // runtimeCaching,
  },
})
