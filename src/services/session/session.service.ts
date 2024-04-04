/* Import packages */
import { v4 as uuid } from 'uuid';
/* Import databases */
import Database from "../../database";
/* Import services */
import AuthService from "../auth/auth.service";
/* Import configs */
import APP_CONFIG from "../../configs/app";
import { ServiceWithContext } from "../core/ServiceWithContent";

export default class SessionService extends ServiceWithContext {
  calculateSessionExpiryDate = () => {
    const timestamp = Date.now() + (APP_CONFIG.JWT.MAX_AGE_REFRESH_TOKEN * 1000)
    const expiresAt = new Date(timestamp)

    return expiresAt
  }

  async createSession(user: any) {
    const { user_id } = user;
    const session_id = uuid();
    const authService = new AuthService()
    const userSession = await Database.user_sessions.create({
      session_id,
      access_token: authService.generateToken(
        { ...user, session_id },
        APP_CONFIG.JWT.MAX_AGE_ACCESS_TOKEN
      ),
      refresh_token: authService.generateToken(
        session_id, 
        APP_CONFIG.JWT.MAX_AGE_REFRESH_TOKEN
      ),
      user_id,
      expires_at: this.calculateSessionExpiryDate()
    }, {
      transaction: this.context?.transaction
    });
    return userSession;
  }

  getSessionBySessionId(session_id: string) {
    return Database.user_sessions.findOne({
      where: { session_id },
      transaction: this.context?.transaction
    });
  }

  updateSession(session_id: string, data: any) {
    return Database.user_sessions.update({ ...data, ...(data.refresh_token ? { expires_at: this.calculateSessionExpiryDate() } : {}) }, {
      where: {
        session_id
      },
      transaction: this.context?.transaction
    });
  }

  refreshSession(user: any, session_id: string) {
    const authService = new AuthService()
    const access_token = authService.generateToken(
      { ...user, session_id },
      APP_CONFIG.JWT.MAX_AGE_ACCESS_TOKEN
    );
    const refresh_token = authService.generateToken(
      session_id,
      APP_CONFIG.JWT.MAX_AGE_REFRESH_TOKEN
    );
    return this.updateSession(session_id, {
      access_token,
      refresh_token,
    });
  }
}