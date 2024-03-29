/* Import packages */
import { Request, Response, NextFunction } from "express";
import { BAD_REQUEST } from "http-status";
import ERROR_CODE from "../../constants/ErrorCode";
import { ResponseError } from "../../classes/ResponseError";
import { withServiceContext } from "../../utils/withServiceContext";
import { buildActivateAccountHref } from "../../utils/auth";
/* Import services */
import AuthService from "../../services/auth/auth.service";
import UserService from "../../services/user/user.service";

export const register = (req: Request, res: Response, next: NextFunction) => withServiceContext(async (context, commit) => {
  const { body } = req;

  const authService = new AuthService(context);
  const userService = new UserService(context);

  const [existingIdentity, existingEmail] = await Promise.all([
    authService.get({ username: body.username }),
    userService.get({ email: body.email })
  ]);

  if (existingIdentity) throw new ResponseError(BAD_REQUEST, ERROR_CODE.AUTH_IDENTIFIER_EXISTS);

  if (existingEmail) throw new ResponseError(BAD_REQUEST, ERROR_CODE.AUTH_EMAIL_EXISTS);

  const created = await userService.create(body);

  await commit();

  res.json(created);

  res.locals = {
    email: created.email,
    username: body.username,
    activeUrl: buildActivateAccountHref(created.token)
  }

  next();
})