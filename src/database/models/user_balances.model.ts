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
  str_money_point: string;
  str_money_token: string;
  str_money_usd: string;
}

export class UserBalance extends BaseModel<UserBalanceAttributes> implements UserBalanceAttributes {
  balance_id!: string;
  user_id!: string;
  money_point!: number;
  money_token!: number;
  money_usd!: number;
  str_money_point!: string;
  str_money_token!: string;
  str_money_usd!: string;

  static associate(models: Sequelize['models']) {
    // define association here
    UserBalance.belongsTo(models.users, {
      foreignKey: "user_id"
    });
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
    },
    str_money_point: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "0.00"
    },
    str_money_token: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "0.00"
    },
    str_money_usd: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "0.00"
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