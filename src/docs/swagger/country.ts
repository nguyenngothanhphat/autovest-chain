module.exports = {
  '/countries': {
    get: {
      tags: ['Country'],
      summary: 'Get List Country',
      produces: ['application/json'],
      responses: {
        200: {
          description: 'Get List Country'
        }
      }
    }
  }
}