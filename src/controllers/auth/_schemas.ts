/* Import packages */
import Joi from "joi";
/* Import constants */
import ERROR_CODE from "../../constants/ErrorCode";

export const loginSchema = Joi.object({
  username: Joi.string().min(6).required().messages({
    'string.min': ERROR_CODE.AUTH_USERNAME_MIN,
    'string.empty': ERROR_CODE.AUTH_MISSING_USERNAME,
    'any.required': ERROR_CODE.AUTH_MISSING_USERNAME
  }),
  password: Joi.string().required().messages({
    'string.empty': ERROR_CODE.AUTH_MISSING_PASSWORD,
    'any.required': ERROR_CODE.AUTH_MISSING_PASSWORD,
  }),
  two_fa_code: Joi.string().required().messages({
    'string.empty': ERROR_CODE.AUTH_MISSING_TWO_FACTOR_CODE,
    'any.required': ERROR_CODE.AUTH_MISSING_TWO_FACTOR_CODE
  })
})

export const registerSchema = Joi.object({
  fullname: Joi.string().min(0).optional(),
  username: Joi.string().min(6).required().messages({
    'string.min': ERROR_CODE.AUTH_USERNAME_MIN,
    'string.empty': ERROR_CODE.AUTH_MISSING_USERNAME,
    'any.required': ERROR_CODE.AUTH_MISSING_USERNAME
  }),
  email: Joi.string().email().required().messages({
    'string.empty': ERROR_CODE.AUTH_MISSING_EMAIL,
    'any.required': ERROR_CODE.AUTH_MISSING_EMAIL,
    'string.email': ERROR_CODE.AUTH_INVALID_EMAIL
  }),
  country_code: Joi.string().min(0).optional(),
  password: Joi.string().required().messages({
    'string.empty': ERROR_CODE.AUTH_MISSING_PASSWORD,
    'any.required': ERROR_CODE.AUTH_MISSING_PASSWORD
  }),
  referral_code: Joi.string().min(0).optional()
});

export const changePasswordSchema = Joi.object({
  password: Joi.string().required().messages({
    'string.empty': ERROR_CODE.AUTH_MISSING_PASSWORD,
    'any.required': ERROR_CODE.AUTH_MISSING_PASSWORD
  }),
  new_password: Joi.string().required().messages({
    'string.empty': ERROR_CODE.AUTH_MISSING_NEW_PASSWORD,
    'any.required': ERROR_CODE.AUTH_MISSING_NEW_PASSWORD
  })
});

export const initForgotPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': ERROR_CODE.AUTH_MISSING_EMAIL,
    'any.required': ERROR_CODE.AUTH_MISSING_EMAIL,
    'string.email': ERROR_CODE.AUTH_INVALID_EMAIL
  })
})

export const forgotPasswordSchema = Joi.object({
  new_password: Joi.string().required().messages({
    'string.empty': ERROR_CODE.AUTH_MISSING_NEW_PASSWORD,
    'any.required': ERROR_CODE.AUTH_MISSING_NEW_PASSWORD
  })
})