import { v4 as uuidv4 } from "uuid";
import { Sequelize, DataTypes } from "sequelize";
import makeModel from "../makeModel";
import BaseModel from '../BaseModel';

export interface CountryAttributes {
  country_id: string;
  code: string;
  name: string;
}

export class Country extends BaseModel<CountryAttributes> implements CountryAttributes {
  country_id!: string;
  code!: string;
  name!: string;

  static associate(models: Sequelize['models']) {
    // define association here
  }
}

export default makeModel((sequelize) => {
  Country.init({
    country_id: {
      type: DataTypes.UUID(),
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'countries',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Country;
})