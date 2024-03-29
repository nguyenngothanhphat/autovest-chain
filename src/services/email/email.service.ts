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
        Your ID: ${data.username} <br />
        Link active: ${data.activeUrl}
      `
    });
  }

  async sendResetPasswordEmail(email: string, data: {
    username: string,
    activeUrl: string
  }) {
    await this.sendEmail({
      to: email,
      subject: '[AIC] Reset Your Password',
      html: `
        <h2>Reset Your Password</h2>
        <p>Dear, <b>${data.username}</b></p>
        <p>You've requested to reset the password linked with your AIC account.</p>
        <p>To confirm your request, please click below button</p>
        <a href='${data.activeUrl}'>Click to confirm</a>
        <p>or you can access this link:</p>
        <p>${data.activeUrl}</p>
        <p>The reset password request will be valid for 30 minutes. Please do not share this email with anyone.</p>
      `
    });
  }
}