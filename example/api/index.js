const route1 = {
  path: '/api',
  method: 'GET',
  handler (request, h) {
    return {
      works: true
    }
  }
}

module.exports = [
  route1
]
