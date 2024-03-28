/* Import packages */
import Joi from "joi";
/* Import constants */
import ERROR_CODE from "../../constants/ErrorCode";

export const upsertTwoFactorSchema = Joi.object({
  setup_code: Joi.string().optional(),
  secret: Joi.string().required(),
  is_enable: Joi.boolean().required(),
  two_fa_code: Joi.string().required().messages({
    'string.empty': ERROR_CODE.AUTH_MISSING_TWO_FACTOR_CODE,
    'any.required': ERROR_CODE.AUTH_MISSING_TWO_FACTOR_CODE
  }),
})