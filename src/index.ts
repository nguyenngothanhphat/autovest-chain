/* Dotenv config */
import dotenv from "dotenv";
dotenv.config();

import Database from "./database";
import { startExpressApp } from "./express-app";

import { countries } from 'countries-list';

async function bootstrap() {
  try {
    await Database.connect();
    await startExpressApp();
    console.log("countries: ", countries);
  } catch (error) {
    console.error('ERROR:', error)
    process.exit(1)
  }
}

bootstrap();