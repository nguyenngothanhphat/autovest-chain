/* Import packages */
import { Request, Response } from "express";
import { UNAUTHORIZED } from "http-status";
/* Import database */
import Database from "../../database";
/* Import configs */
import { ResponseError } from "../../classes/ResponseError";
import ERROR_CODE from "../../constants/ErrorCode";
import { withServiceContext } from "../../utils/withServiceContext";
/* Import service */
import UserService from "../../services/user/user.service";

export const getProfile = (req: Request, res: Response) => withServiceContext(async (context, commit) => {
  const { user: { payload: { user_id } } } = req;
  const userService = new UserService(context);
  const user = await userService.get({ user_id }, {
    include: [
      { model: Database.identities, attributes: ["username"] }
    ]
  });
  if (!user) throw new ResponseError(UNAUTHORIZED, ERROR_CODE.AUTH_UNAUTHENTICATED);
  const { identity, ...userInfo } = user;
  const payload = {
    ...userInfo,
    username: identity.username
  }
  await commit();
  res.json(payload);
});