import { v4 as uuidv4 } from "uuid";
import { Sequelize, DataTypes } from "sequelize";
import makeModel from "../makeModel";
import BaseModel from '../BaseModel';

export interface TwoFactorAuthAttributes {
  two_fa_auth_id: string;
  user_id: string;
  setup_code: string;
  is_enable: boolean;
  secret: string;
}

export class TwoFactorAuth extends BaseModel<TwoFactorAuthAttributes> implements TwoFactorAuthAttributes {
  two_fa_auth_id!: string;
  user_id!: string;
  setup_code!: string;
  is_enable!: boolean;
  secret!: string;

  static associate(models: Sequelize['models']) {
    // define association here
  }
}

export default makeModel((sequelize) => {
  TwoFactorAuth.init({
    two_fa_auth_id: {
      type: DataTypes.UUID(),
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
    },
    user_id: {
      type: DataTypes.UUID(),
      allowNull: false
    },
    setup_code: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    is_enable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    secret: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'two_factor_auth',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
  });
  return TwoFactorAuth;
})