module.exports = {
  '/users/me': {
    get: {
      tags: ['User'],
      summary: 'Get Profile',
      produces: ['application/json'],
      security: [
        {
          auth_token: [],
        },
      ],
      responses: {
        200: {
          description: 'Active Account Successfully',
        },
      }
    }
  },
  '/users/balance': {
    get: {
      tags: ['User'],
      summary: 'Get User Balance',
      produces: ['application/json'],
      security: [
        {
          auth_token: [],
        },
      ],
      responses: {
        200: {
          description: 'Get User Balance'
        }
      }
    }
  },
  '/users/two-factor-code': {
    get: {
      tags: ['User'],
      summary: 'Get 2FA',
      produces: ['application/json'],
      security: [
        {
          auth_token: [],
        },
      ],
      responses: {
        200: {
          description: 'Get Two Factor Code'
        }
      }
    }
  },
  '/users/two-factor-auth': {
    post: {
      tags: ['User'],
      summary: 'Enable/Disable 2FA',
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
                setup_code: {
                  type: 'string'
                },
                is_enable: {
                  type: 'boolean'
                },
                two_fa_code: {
                  type: 'string'
                }
              },
              required: ['is_enable', 'two_fa_code']
            }
          }
        }
      },
      responses: {
        202: {
          description: 'Enable/Disable 2FA'
        }
      }
    }
  }
}