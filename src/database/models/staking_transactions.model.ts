import { v4 as uuidv4 } from "uuid";
import { Sequelize, DataTypes } from "sequelize";
import makeModel from "../makeModel";
import BaseModel from '../BaseModel';

export interface StakingTransactionAttributes {
  staking_transaction_id: string;
  user_id: string;
  amount: number;
  level: number;
}

export class StakingTransaction extends BaseModel<StakingTransactionAttributes> implements StakingTransactionAttributes {
  staking_transaction_id!: string;
  user_id!: string;
  amount!: number;
  level!: number;

  static associate(models: Sequelize['models']) {
    // define association here
  }
}

export default makeModel((sequelize) => {
  StakingTransaction.init({
    staking_transaction_id: {
      type: DataTypes.UUID(),
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
    },
    user_id: {
      type: DataTypes.UUID(),
      allowNull: false
    },
    amount: {
      type: DataTypes.DOUBLE(),
      allowNull: false
    },
    level: {
      type: DataTypes.INTEGER(),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'staking_transactions',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return StakingTransaction;
})