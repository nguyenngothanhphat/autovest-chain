/* Import packages */
import { Request, Response, NextFunction } from "express";
import { UNAUTHORIZED } from "http-status";
import { isEmpty } from 'lodash';
/* Import configs */
import { ResponseError } from "../classes/ResponseError";
import ERROR_CODE from "../constants/ErrorCode";
import TokenError from "../constants/TokenError";
import { HeadersWithAuthorization } from "../types/auth";
/* Import services */
import AuthService from "../services/auth/auth.service";

export const authenticated = (req: Request, res: Response, next: NextFunction) => {
  const headers = req.headers as HeadersWithAuthorization;
  const { authorization: access_token } = headers;
  if (isEmpty(access_token)) {
    throw new ResponseError(UNAUTHORIZED, ERROR_CODE.AUTH_NOT_LOGGED_IN);
  }
  try {
    const user = AuthService.verifyToken(access_token);
    if (!user?.payload?.user_id) throw new ResponseError(UNAUTHORIZED, ERROR_CODE.AUTH_UNAUTHENTICATED);
    req.user = user;
    next();
  } catch (error: any) {
    if (error?.name === TokenError.TOKEN_EXP_ERROR) {
      throw new ResponseError(UNAUTHORIZED, ERROR_CODE.AUTH_TOKEN_EXP);
    }
    throw error;
  }
}