import { v4 as uuidv4 } from "uuid";
import { Sequelize, DataTypes } from "sequelize";
import makeModel from "../makeModel";
import BaseModel from '../BaseModel';

export interface StakingLevelAttributes {
  staking_level_id: string;
  level: string;
  commission_rate: number;
}

export class StakingLevel extends BaseModel<StakingLevelAttributes> implements StakingLevelAttributes {
  staking_level_id!: string;
  level!: string;
  commission_rate!: number;

  static associate(models: Sequelize['models']) {
    // define association here
  }
}

export default makeModel((sequelize) => {
  StakingLevel.init({
    staking_level_id: {
      type: DataTypes.UUID(),
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
    },
    level: {
      type: DataTypes.INTEGER(),
      allowNull: false
    },
    commission_rate: {
      type: DataTypes.DOUBLE(),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'staking_levels',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return StakingLevel;
})