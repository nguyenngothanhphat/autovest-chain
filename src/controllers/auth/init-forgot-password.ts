/* Import packages */
import { Request, Response, NextFunction } from "express";
import { NOT_FOUND } from "http-status";
import { v4 as uuid } from "uuid";
/* Import database */
import Database from "../../database";
/* Import configs */
import { withServiceContext } from "../../utils/withServiceContext";
import { ResponseError } from "../../classes/ResponseError";
import ERROR_CODE from "../../constants/ErrorCode";
import { CommonTokenAction } from "../../constants/Enums";
import APP_CONFIG from "../../configs/app";
import { buildResetPasswordHref } from "../../utils/auth";
/* Import services */
import UserService from "../../services/user/user.service";
import TokenService from "../../services/token/token.service";

export const initForgotPassword = (req: Request, res: Response, next: NextFunction) => withServiceContext(async (context, commit) => {
  const { body: { email } } = req;
  const userService = new UserService(context);
  const user = await userService.get({ email }, {
    include: [
      { model: Database.identities, attributes: ["username"] }
    ]
  });
  if (!user) throw new ResponseError(NOT_FOUND, ERROR_CODE.USER_NOT_EXISTS);
  const { user_id } = user;
  const tokenService = new TokenService(context);
  const token_id = uuid();
  const data = {
    token_id,
    action: CommonTokenAction.ForgotPassword,
    token: tokenService.generateToken(
      { token_id, user_id, action: CommonTokenAction.ForgotPassword }, 
      APP_CONFIG.JWT.MAX_AGE_TOKEN_ACTION
    )
  }
  const created = await tokenService.create(data);

  await commit();

  res.json(created);

  res.locals = {
    email: email,
    username: user.identity.username,
    activeUrl: buildResetPasswordHref(created.token)
  };

  next();
});