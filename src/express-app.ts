/* Import packages */
import 'express-async-errors';
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import httpStatus from "http-status";
import isNil from "lodash/isNil";
import compression from 'compression';
import helmet from "helmet";
/* Import utils */
import APP_CONFIG from "./configs/app";
import { ResponseError } from "./classes/ResponseError";
import registerRoutes from "./registerRoutes";
import { flattenObj } from "./utils/object";
import { isProduction } from "./utils/common";

// APP_CONFIG values check
const flattenConfigValues = flattenObj(APP_CONFIG)
const missingValues = Object.entries(flattenConfigValues).map(([key, value]) => {
  if (isNil(value)) return key
  return false
}).filter(Boolean) as string[]
if (missingValues.length) {
  console.error(new Error(`Missing config values: ${missingValues.join(', ')}`))
  process.exit(1)
}

const app = express();

function shouldCompress (req: Request, res: Response) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }
  // fallback to standard filter function
  return compression.filter(req, res)
}

process.addListener('uncaughtException', (err) => {
  console.error('ERROR:', err)
  process.exit(1)
})

export async function startExpressApp() {
  if (isProduction()) {
    app.enable("trust proxy");
    app.use(helmet())
    app.use(compression({ filter: shouldCompress }))
  }
  app.use(cors(APP_CONFIG.CORS));
  app.use(bodyParser.urlencoded({ extended: false, limit: '50mb', parameterLimit: 1000000 }));
  app.use(bodyParser.json({
    limit: '50mb'
  }));

  /* ROUTES */
  app.get("/health", (req, res) => {
    res.send('OK');
  });

  app.use('/', registerRoutes());

  app.use((err: ResponseError | Error, req: Request, res: Response, next: NextFunction) => {
    if (res.writableEnded) return;
    if (err instanceof ResponseError) {
      return res.status(err.status).json(err);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  });

  app.listen({ port: APP_CONFIG.PORT }, () => {
    console.info("[🚀 Server] App listening on port " + APP_CONFIG.PORT);
  });
}

process.on('exit', code => {
  const error = new Error(`Process exit with code ${code}`);
  console.error('ERROR:', error);
});