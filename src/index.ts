/* Dotenv config */
import dotenv from "dotenv";
dotenv.config();

import Database from "./database";
import { startExpressApp } from "./express-app";

async function bootstrap() {
  try {
    await Database.connect();
    await startExpressApp();
  } catch (error) {
    console.error('ERROR:', error)
    process.exit(1)
  }
}

bootstrap();