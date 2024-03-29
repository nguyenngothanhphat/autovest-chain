import APP_CONFIG from "../configs/app";
import ROUTES from "../constants/Routes";

export const buildActivateAccountHref = (token: string) => {
  return `${APP_CONFIG.SERVER_URL}${ROUTES.ACTIVATE_ACCOUNT.replace('{token}', token)}`;
}

export const buildResetPasswordHref = (token: string) => {
  return `${APP_CONFIG.SERVER_URL}${ROUTES.RESET_PASSWORD.replace('{token}', token)}`;
}