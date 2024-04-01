/* Import packages */
import { Request, Response } from "express";
/* Import configs */
import { ResponseError } from "../../classes/ResponseError";
import ERROR_CODE from "../../constants/ErrorCode";
import { withServiceContext } from "../../utils/withServiceContext";

export const withdraw = (req: Request, res: Response) => withServiceContext(async (context, commit) => {
  const { params: { address }, body } = req;
})