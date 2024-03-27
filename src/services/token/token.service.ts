/* Import packages */
import * as jwt from 'jsonwebtoken';
/* Import databases */
import Database from "../../database";
import { ServiceWithContext } from '../core/ServiceWithContent';
import APP_CONFIG from '../../configs/app';

export default class TokenService extends ServiceWithContext {
  static generateToken(data: any, maxAge: number) {
    return jwt.sign({
      payload: data
    }, APP_CONFIG.JWT.SECRET as string, {
      expiresIn: maxAge,
      algorithm: APP_CONFIG.JWT.JWT_ALGORITHM as jwt.Algorithm
    });
  }

  verifyToken(token: string) {
    return jwt.verify(token, APP_CONFIG.JWT.SECRET as string, {
      algorithms: [APP_CONFIG.JWT.JWT_ALGORITHM as jwt.Algorithm]
    });
  }

  async isTokenValid(token: string) {
    return Database.tokens.findOne({
      where: {
        token,
        is_valid: true
      },
      transaction: this.context?.transaction
    }).then((res) => res?.toJSON());
  }

  invalidateToken(token_id: string) {
    return Database.tokens.update({
      is_valid: false
    }, {
      where: { token_id },
      transaction: this.context?.transaction
    });
  }
}