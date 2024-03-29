/* Import packages */
import { Request, Response } from "express";
import { ACCEPTED, BAD_REQUEST, NOT_FOUND, UNAUTHORIZED } from "http-status";
/* Import database */
import Database from "../../database";
/* Import configs */
import { withServiceContext } from "../../utils/withServiceContext";
import { ResponseError } from "../../classes/ResponseError";
import ERROR_CODE from "../../constants/ErrorCode";
import { CommonTokenAction } from "../../constants/Enums";
/* Import services */
import TokenService from "../../services/token/token.service";
import AuthService from "../../services/auth/auth.service";
import UserService from "../../services/user/user.service";

export const forgotPassword = (req: Request, res: Response) => withServiceContext(async (context, commit) => {
  const query = req.query;
  const { body: { new_password } } = req;
  const { token } = query;

  let verifyToken: any;

  const tokenService = new TokenService(context);
  try {
    verifyToken = tokenService.verifyToken(token as string);
  } catch (error) {
    throw new ResponseError(UNAUTHORIZED, ERROR_CODE.AUTH_TOKEN_EXP);
  }

  const { payload: { user_id, token_id, action } } = verifyToken;

  const isValid = await tokenService.isTokenValid(token as string);

  if (!isValid) throw new ResponseError(UNAUTHORIZED, ERROR_CODE.TOKEN_INVALID);

  if (action !== CommonTokenAction.ForgotPassword) throw new ResponseError(BAD_REQUEST, ERROR_CODE.TOKEN_INVALID_ACTION);

  const userService = new UserService(context);
  const user = await userService.get({ user_id }, {
    include: [
      { model: Database.identities, as: 'identity', attributes: ["identitiy_id"] }
    ]
  });

  if (!user) throw new ResponseError(NOT_FOUND, ERROR_CODE.USER_NOT_EXISTS);

  const authService = new AuthService(context);

  await Promise.all([
    authService.update({ password: authService.hashPassword(new_password) }, user.identity.identitiy_id),
    tokenService.invalidateToken(token_id)
  ])

  await commit();

  res.sendStatus(ACCEPTED);
});