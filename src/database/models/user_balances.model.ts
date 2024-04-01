import { v4 as uuidv4 } from "uuid";
import { Sequelize, DataTypes } from "sequelize";
import makeModel from "../makeModel";
import BaseModel from '../BaseModel';

export interface UserBalanceAttributes {
  balance_id: string;
  user_id: string;
  money_point: number;
  money_token: number;
  money_usd: number;
}

export class UserBalance extends BaseModel<UserBalanceAttributes> implements UserBalanceAttributes {
  balance_id!: string;
  user_id!: string;
  money_point!: number;
  money_token!: number;
  money_usd!: number;

  static associate(models: Sequelize['models']) {
    // define association here
  }
}

export default makeModel((sequelize) => {
  UserBalance.init({
    balance_id: {
      type: DataTypes.UUID(),
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
    },
    user_id: {
      type: DataTypes.UUID(),
      allowNull: false
    },
    money_point: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      }
    },
    money_token: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      }
    },
    money_usd: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      }
    }
  }, {
    sequelize,
    modelName: 'user_balances',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
  });
  return UserBalance;
})