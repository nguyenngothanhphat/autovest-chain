/* Import packages */
import { Schema } from "joi";
import { NextFunction, Request, Response } from "express";
import { BAD_REQUEST } from "http-status";
/* Import constants */
import ERROR_CODE from "../constants/ErrorCode";

export const validate = (schema: Schema, index: 'query' | 'params' | 'body' = 'body') => (req: Request, res: Response, next: NextFunction) => {
  const obj = req[index];
    
  const { error } = schema.validate(obj, {
    abortEarly: false
  });

  if (!error) return next();

  res.status(BAD_REQUEST).json({
    errorKey: ERROR_CODE.COMMON_VALIDATION_ERROR,
    errors: error.details?.map(field => field.message) || []
  });
}