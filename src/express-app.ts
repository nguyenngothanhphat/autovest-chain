/* Import packages */
import 'express-async-errors';
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import httpStatus from "http-status";
/* Import utils */
import APP_CONFIG from "./configs/app";
import { ResponseError } from "./classes/ResponseError";
import registerRoutes from "./registerRoutes";

const app = express();

process.addListener('uncaughtException', (err) => {
  console.error('ERROR:', err)
  process.exit(1)
})

export async function startExpressApp() {
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