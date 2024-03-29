/* Import packages */
import { Request, Response } from "express";
import { ACCEPTED, BAD_REQUEST } from "http-status";
/* Import configs */
import { withServiceContext } from "../../utils/withServiceContext";
import { ResponseError } from "../../classes/ResponseError";
import ERROR_CODE from "../../constants/ErrorCode";
/* Import services */
import AuthService from "../../services/auth/auth.service";

export const changePassword = (req: Request, res: Response) => withServiceContext(async (context, commit) => {
  const { user: { payload: { username } }, body } = req;
  const { password, new_password } = body;
  const authService = new AuthService(context);
  const identity = await authService.get({ 
    username, 
    password: authService.hashPassword(password) 
  });
  if (!identity) throw new ResponseError(BAD_REQUEST, ERROR_CODE.AUTH_INCORRECT_PASSWORD);
  await authService.update({ password: authService.hashPassword(new_password) }, identity.identitiy_id);
  await commit();
  res.sendStatus(ACCEPTED);
});