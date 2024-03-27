/* Import packages */
import { Request, Response } from "express";
import { ACCEPTED, BAD_REQUEST, UNAUTHORIZED } from "http-status";
import { withServiceContext } from "../../utils/withServiceContext";
import ERROR_CODE from "../../constants/ErrorCode";
import { ResponseError } from "../../classes/ResponseError";
/* Import constants */
import { CommonTokenAction } from "../../constants/Enums";
/* Import services */
import TokenService from "../../services/token/token.service";
import UserService from "../../services/user/user.service";

export const activate = (req: Request, res: Response) => withServiceContext(async (context, commit) => {
  const query = req.query;
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
  
  if (action !== CommonTokenAction.ActivateAccount) throw new ResponseError(BAD_REQUEST, ERROR_CODE.TOKEN_INVALID_ACTION);

  const userService = new UserService(context);

  await Promise.all([
    userService.update({ is_valid: false }, user_id),
    tokenService.invalidateToken(token_id)
  ])

  await commit();

  res.sendStatus(ACCEPTED);
})