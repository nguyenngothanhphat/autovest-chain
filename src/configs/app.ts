type CORSOrigin = string | RegExp

const ENV = process.env.APP_ENV || 'development'

const corsOrigin: CORSOrigin | CORSOrigin[] = 
    ENV === 'production' ? [new RegExp(process.env.REGEXP_DOMAIN_CORS || "", "gm") || ''] : [new RegExp(process.env.REGEXP_DOMAIN_CORS || "", "gm") || '', 'http://localhost:3001', 'http://localhost:3000']

const APP_CONFIG = {
  ENV,
  PORT: 4000,
  HASH_ALGORITHM: process.env.ALGORITHM,
  CORS: {
    origin: corsOrigin,
    credentials: true,
    optionSuccessStatus: 200,
    exposedHeaders: ['x-check-sum']
  },
  JWT: {
    SECRET: process.env.SECRET_KEY,
    JWT_ALGORITHM: process.env.JWT_ALGORITHM,
    MAX_AGE_TOKEN_ACTION: 5 * 60 // 5 minutes
  },
  NODEMAILER: {
    NODEMAILER_SES_SENDER: process.env.NODEMAILER_SES_SENDER || "",
    NODEMAILER_SES_SENDER_NAME: process.env.NODEMAILER_SES_SENDER_NAME || "",
    NODEMAILER_SES_SECRET_KEY: process.env.NODEMAILER_SES_SECRET_KEY,
    MAIL_HOST: process.env.MAIL_HOST
  },
}

export default APP_CONFIG;