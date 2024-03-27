const ERROR_CODE = {
  /* Common */
  COMMON_VALIDATION_ERROR: "common.validationError",
  COMMON_INTERNAL_SERVER_ERROR: "common.internalServerError",
  
  /* Auth */
  AUTH_USERNAME_MIN: "auth.userNameMin",
  AUTH_MISSING_USERNAME: "auth.missingUserName",
  AUTH_MISSING_PASSWORD: "auth.missingPassword",
  AUTH_MISSING_EMAIL: "auth.missingEmail",
  AUTH_INVALID_EMAIL: "auth.invalidEmail",
  AUTH_IDENTIFIER_EXISTS: "auth.identifierExists",
  AUTH_EMAIL_EXISTS: "auth.emailExists",

  /* Token */
  TOKEN_INVALID: "token.tokenInvalid",
  TOKEN_INVALID_ACTION: "token.actionInvalid",
  AUTH_TOKEN_EXP: "auth.tokenExp",
}

export default ERROR_CODE;