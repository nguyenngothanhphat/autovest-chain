import { FORBIDDEN } from "http-status";
import { uniq } from "lodash";
import { ResponseError } from "../classes/ResponseError";
import ERROR_CODE from "../constants/ErrorCode";
import { NextFunction, Request, Response } from "express";
import { Role } from "../constants/Role";

export const authorized = (allowedRoles: Role[] = []) => {
  return function authorizationMiddleware(req: Request, res: Response, next: NextFunction) {
    const allowedRolesWithAdmin = uniq([...allowedRoles, Role.ADMIN]);
    const { user } = req
    if (!user) {
      throw new ResponseError(FORBIDDEN, ERROR_CODE.AUTH_ACCESS_DENIED)
    }
    const { role } = user.payload
    if (!allowedRolesWithAdmin.includes(role)) {
      throw new ResponseError(FORBIDDEN, ERROR_CODE.AUTH_ACCESS_DENIED);
    }
    next()
  }
}
