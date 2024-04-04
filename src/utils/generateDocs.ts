import { Request, Response } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import fs from 'fs';
import _path from 'path';
import capitalize from 'lodash/capitalize';
import APP_CONFIG from '../configs/app';

const baseRoutes = _path.resolve('./src/docs/swagger');

const getPathRoutes = (path: any) => `${baseRoutes}${path}`;

const getDocs = (basePath: any, getPath: any) => {
  return fs.readdirSync(basePath).reduce((acc, file) => {
    const data = require(getPath(`/${file}`));
    acc = {
      ...acc,
      ...data,
    }
    return acc
  }, {})
}

const docsSources = getDocs(baseRoutes, getPathRoutes);

const baseURLServer = [
  {
    url: `${APP_CONFIG.SERVER_URL}`,
    description: `${capitalize(APP_CONFIG.ENV)} Server`,
  }
];

export const generateDocs = (app: any) => {
  const swaggerOptions = {
    definition: {
      openapi: '3.0.1',
      servers: baseURLServer,
      // security: [  //Set GLOBAL
      //   {
      //     auth_token: []
      //   }
      // ],
      components: {
        securitySchemes: {
          auth_token: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description:
              'JWT Authorization header using the JWT scheme. Example: “Authorization: JWT {token}”',
          },
        },
        // schemas: docsSchemes,
        parameters: {
          token: {
            in: 'query',
            name: 'token',
            required: true,
            default: 0,
          },
          page: {
            in: 'query',
            name: 'page',
            required: false,
            default: 1,
          },
          pageSize: {
            in: 'query',
            name: 'pageSize',
            required: false,
            default: 12,
          },
          filtered: {
            in: 'query',
            name: 'filtered',
            required: false,
            default: [],
            description: 'Example: [{"id": "nama", "value": "test"}]',
          },
          sorted: {
            in: 'query',
            name: 'sorted',
            required: false,
            default: [],
            description: 'Example: [{"id": "createdAt", "desc": true}]',
          },
        },
      },
      info: {
        title: `API ${APP_CONFIG.APP_NAME} Documentation`,
        version: '1.0.0',
      },
      paths: docsSources,
    },
    apis: [],
  }

  const swaggerOptURL = [
    {
      url: `${APP_CONFIG.SERVER_URL}/docs.json`,
      name: `${capitalize(APP_CONFIG.ENV)} Server`,
    }
  ]

  const swaggerSpec = swaggerJSDoc(swaggerOptions)
  const optionsSwaggerUI = {
    explorer: true,
    swaggerOptions: {
      urls: swaggerOptURL,
    },
  }

  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })

  app.use('/docs', swaggerUI.serve)
  app.get('/docs', swaggerUI.setup(swaggerSpec, optionsSwaggerUI))
}