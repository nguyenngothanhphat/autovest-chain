module.exports = {
  '/auth/activate': {
    get: {
      tags: ['Auth'],
      summary: 'Active Your Account',
      produces: ['application/json'],
      parameters: [
        {
          $ref: '#/components/parameters/token',
        },
      ],
      responses: {
        202: {
          description: 'Active Account Successfully',
        },
      }
    }
  },
  '/auth/register': {
    post: {
      tags: ['Auth'],
      summary: 'Create New Account',
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                fullname: {
                  type: 'string',
                },
                username: {
                  type: 'string'
                },
                email: {
                  type: 'string'
                },
                country_code: {
                  type: 'string'
                },
                referral_code: {
                  type: 'string'
                }
              },
              required: [
                'username',
                'email',
                'password'
              ]
            }
          }
        }
      },
      responses: {
        200: {
          description: "Created account successfully"
        }
      }
    }
  },
  '/auth/login': {
    post: {
      tags: ['Auth'],
      summary: 'Login Your Account',
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                username: {
                  type: 'string',
                },
                password: {
                  type: 'string',
                },
                two_fa_code: {
                  type: 'string'
                }
              },
              required: ['username', 'password', 'two_fa_code'],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Login Your Account',
        },
      },
    }
  },
  '/auth/change-password': {
    post: {
      tags: ['Auth'],
      summary: 'Change Password For Your Account',
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
                password: {
                  type: 'string'
                },
                new_password: {
                  type: 'string'
                }
              },
              required: ['password', 'new_password']
            }
          }
        }
      },
      responses: {
        202: {
          description: 'Changed Password Successfully',
        },
      },
    }
  },
  '/auth/init-forgot-password': {
    post: {
      tags: ['Auth'],
      summary: 'Init Forgot Password',
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string'
                }
              },
              required: ['email']
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Init Forgot Password'
        }
      }
    }
  },
  '/auth/forgot-password': {
    post: {
      tags: ['Auth'],
      summary: 'Forgot Password',
      parameters: [
        {
          $ref: '#/components/parameters/token',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                new_password: {
                  type: 'string'
                }
              },
              required: ['new_password']
            }
          }
        }
      },
      responses: {
        202: {
          description: 'Forgot Password Successfully'
        }
      }
    }
  },
  '/auth/refresh': {
    post: {
      tags: ['Auth'],
      summary: 'Refresh Token',
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                refreshToken: {
                  type: 'string'
                }
              },
              required: ['refreshToken']
            }
          }
        }
      },
      responses: {
        202: {
          description: 'Refresh Token'
        }
      }
    }
  },
  '/auth/logout': {
    post: {
      tags: ['Auth'],
      summary: 'Logout Your Account',
      security: [
        {
          auth_token: [],
        },
      ],
      responses: {
        202: {
          description: 'Logout Your Account'
        }
      }
    }
  }
}