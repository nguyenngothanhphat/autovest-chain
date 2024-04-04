const ERROR_CODE = {
  /* Common */
  COMMON_VALIDATION_ERROR: "common.validationError",
  COMMON_INTERNAL_SERVER_ERROR: "common.internalServerError",
  COMMON_SETTING_FAIL: "common.settingFail",
  
  /* Auth */
  AUTH_USERNAME_MIN: "auth.userNameMin",
  AUTH_MISSING_USERNAME: "auth.missingUserName",
  AUTH_MISSING_PASSWORD: "auth.missingPassword",
  AUTH_MISSING_NEW_PASSWORD: "auth.missingNewPassword",
  AUTH_MISSING_EMAIL: "auth.missingEmail",
  AUTH_MISSING_TWO_FACTOR_CODE: "auth.missingTwoFactorCode",
  AUTH_MISSING_REFRESH_TOKEN: "auth.missingRefreshToken",
  AUTH_INVALID_EMAIL: "auth.invalidEmail",
  AUTH_IDENTIFIER_EXISTS: "auth.identifierExists",
  AUTH_EMAIL_EXISTS: "auth.emailExists",
  AUTH_NOT_LOGGED_IN: "auth.notLoggedIn",
  AUTH_UNAUTHENTICATED: "auth.unauthenticated",
  AUTH_ACCESS_DENIED: "auth.accessDenied",
  AUTH_INCORRECT_PASSWORD: "auth.incorrectPassword",

  /* Token */
  TOKEN_INVALID: "token.tokenInvalid",
  TOKEN_INVALID_ACTION: "token.actionInvalid",
  AUTH_TOKEN_EXP: "auth.tokenExp",

  /* User */
  USER_NOT_EXISTS: "user.notExists",

  /* Wallet */
  WALLET_NOT_EXISTS: "wallet.notExists",

  /* Crypto Token */
  CRYPTO_TOKEN_SYMBOL_EXISTS: "cryptoToken.symbolExists",
  CRYPTO_TOKEN_NOT_EXISTS: "cryptoToken.notExists"
}

export default ERROR_CODE;