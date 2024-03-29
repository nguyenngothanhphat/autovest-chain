/* Import packages */
import { Request, Response, NextFunction } from "express";
/* Import services */
import EmailService from "../services/email/email.service";

export const sendResetPasswordEmail = async (req: Request, res: Response<unknown, {
  email: string,
  username: string,
  activeUrl: string
}>, next: NextFunction) => {
  if (!res.locals.email || !res.locals.activeUrl) {
    return next();
  }

  const emailService = new EmailService();
  await emailService.sendResetPasswordEmail(res.locals.email, {
    username: res.locals.username,
    activeUrl: res.locals.activeUrl
  });

  next();
}