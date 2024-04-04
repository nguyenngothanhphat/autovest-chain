type CORSOrigin = string | RegExp

const ENV = process.env.APP_ENV || 'development'

const corsOrigin: CORSOrigin | CORSOrigin[] = 
    ENV === 'production' ? [new RegExp(process.env.REGEXP_DOMAIN_CORS || "", "gm") || ''] : [new RegExp(process.env.REGEXP_DOMAIN_CORS || "", "gm") || '', 'http://localhost:3001', 'http://localhost:3000']

const APP_CONFIG = {
  ENV,
  PORT: 4000,
  APP_NAME: process.env.APP_NAME,
  HASH_ALGORITHM: process.env.ALGORITHM,
  FRONTEND_URL: process.env.FRONTEND_URL,
  SERVER_URL: process.env.SERVER_URL,
  TOKEN_SYMBOL_SYSTEM: process.env.TOKEN_SYMBOL_SYSTEM,
  CORS: {
    origin: corsOrigin,
    credentials: true,
    optionSuccessStatus: 200,
    exposedHeaders: ['x-check-sum']
  },
  JWT: {
    SECRET: process.env.SECRET_KEY,
    JWT_ALGORITHM: process.env.JWT_ALGORITHM,
    MAX_AGE_ACCESS_TOKEN: 15 * 60, // 15 minutes
    MAX_AGE_REFRESH_TOKEN: 30 * 24 * 60 * 60, // 1 months
    MAX_AGE_TOKEN_ACTION: 5 * 60 // 5 minutes
  },
  NODEMAILER: {
    NODEMAILER_SES_SENDER: process.env.NODEMAILER_SES_SENDER || "",
    NODEMAILER_SES_SENDER_NAME: process.env.NODEMAILER_SES_SENDER_NAME || "",
    NODEMAILER_SES_SECRET_KEY: process.env.NODEMAILER_SES_SECRET_KEY,
    MAIL_HOST: process.env.MAIL_HOST
  },
  _2FA: {
    _2FA_ISSUER: process.env.TWO_FACTOR_AUTH_ISSUER
  }
}

export default APP_CONFIG;