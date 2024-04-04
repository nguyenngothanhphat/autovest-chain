module.exports = {
  '/tokens': {
    get: {
      tags: ['Token'],
      summary: 'Get List Tokens',
      produces: ['application/json'],
      responses: {
        200: {
          description: 'Get List Tokens'
        }
      }
    },
    post: {
      tags: ['Token'],
      summary: 'Create New Tokens',
      produces: ['application/json'],
      security: [
        {
          auth_token: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                symbol: {
                  type: 'string'
                },
                name: {
                  type: 'string'
                },
                description: {
                  type: 'string'
                },
                memo: {
                  type: 'string'
                }
              },
              required: ['symbol']
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Create New Tokens'
        }
      }
    },
    patch: {
      tags: ['Token'],
      summary: 'Update Token',
      produces: ['application/json'],
      security: [
        {
          auth_token: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                symbol: {
                  type: 'string'
                },
                name: {
                  type: 'string'
                },
                description: {
                  type: 'string'
                },
                memo: {
                  type: 'string'
                }
              },
            }
          }
        }
      }
    },
    delete: {
      tags: ['Token'],
      summary: 'Delete Token',
      produces: ['application/json'],
      security: [
        {
          auth_token: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'Crypto Token ID',
        },
      ],
      responses: {
        202: {
          description: 'Deleted Token Successfully'
        }
      }
    }
  },
}