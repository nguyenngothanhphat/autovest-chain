/* Import packages */
import nodemailer, { SendMailOptions } from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
/* Import configs */
import APP_CONFIG from '../../configs/app';

export default class EmailService {
  transport = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    secure: false,
    host: APP_CONFIG.NODEMAILER.MAIL_HOST,
    auth: {
      user: APP_CONFIG.NODEMAILER.NODEMAILER_SES_SENDER,
      pass: APP_CONFIG.NODEMAILER.NODEMAILER_SES_SECRET_KEY
    },
  }));

  async sendEmail(data: Omit<SendMailOptions, 'from'>) {
    try {
      const params: SendMailOptions = {
        ...data,
        from: {
          name: APP_CONFIG.NODEMAILER.NODEMAILER_SES_SENDER_NAME,
          address: APP_CONFIG.NODEMAILER.NODEMAILER_SES_SENDER
        }
      }
      await new Promise((resolve, reject) => {
        this.transport.sendMail(params, (error, info) => {
          console.info(info);
          if (error) {
            return reject(error);
          }
          resolve({
            message: "Email processed succesfully!"
          })
        })
      });
    } catch (error) {
      console.error("ERROR:", error);
      throw error;
    }
  }

  async sendActivationEmail(email: string, data: {
    username: string,
    activeUrl: string
  }) {
    await this.sendEmail({
      to: email,
      subject: '[AIC] Confirm your email address',
      html: `
        Your ID: ${data.username}
        Link active: ${data.activeUrl}
      `
    })
  }
}