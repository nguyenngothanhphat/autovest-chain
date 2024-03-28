/* Import packages */
import { WhereOptions } from "sequelize";
import speakeasy, { GeneratedSecret } from "speakeasy";
import qrCode from "qrcode";
/* Import databases */
import Database from "../../database";
/* Import configs */
import { ServiceWithContext } from "../core/ServiceWithContent";

export default class TwoFactorAuthService extends ServiceWithContext {
  async generateTwoFactorCode(label: string) {
    const secret = speakeasy.generateSecret({ length: 10 });

    const otpAuthUrl = speakeasy.otpauthURL({
      secret: secret.ascii,
      label: label,
      issuer: 'Autovest-Chain',
    });

    const imageUrl = await qrCode.toDataURL(otpAuthUrl);

    return { 
      barcode_image_url: imageUrl,
      setup_code: secret.base32,
      secret: JSON.stringify(secret)
    }
  }
  
  verifyTwoFactorCode(secret: GeneratedSecret, twoFACode: string) {
    return speakeasy.totp.verify({
      secret: secret.base32,
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

  upsert(data: any) {
    return Database.two_factor_auth.upsert({
      ...data
    }, {
      validate: true,
      conflictFields: ["two_fa_auth_id", "user_id"],
      transaction: this.context?.transaction
    });
  }
}