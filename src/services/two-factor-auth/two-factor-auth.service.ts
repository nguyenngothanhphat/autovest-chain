/* Import packages */
import { WhereOptions } from "sequelize";
import speakeasy from "speakeasy";
import qrCode from "qrcode";
/* Import databases */
import Database from "../../database";
/* Import configs */
import { ServiceWithContext } from "../core/ServiceWithContent";
import APP_CONFIG from "../../configs/app";

export default class TwoFactorAuthService extends ServiceWithContext {
  async generateTwoFactorCode(label: string) {
    const secret = speakeasy.generateSecret({ length: 10 });

    const otpAuthUrl = speakeasy.otpauthURL({
      secret: secret.ascii,
      label: label,
      issuer: APP_CONFIG._2FA._2FA_ISSUER,
    });

    const imageUrl = await qrCode.toDataURL(otpAuthUrl);

    return { 
      barcode_image_url: imageUrl,
      setup_code: secret.base32,
    }
  }
  
  verifyTwoFactorCode(secret: string, twoFACode: string) {
    return speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: twoFACode,
      window: 1
    });
  }

  async get(where?: WhereOptions) {
    return Database.two_factor_auth.findOne({
      where,
      transaction: this.context?.transaction
    }).then((res) => res?.toJSON());
  }

  create(data: any) {
    return Database.two_factor_auth.create({
      ...data
    }, {
      transaction: this.context?.transaction
    });
  }

  update(data: any, setup_code: string) {
    return Database.two_factor_auth.update({
      ...data
    }, {
      where: { setup_code },
      transaction: this.context?.transaction
    });
  }
}