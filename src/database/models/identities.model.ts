import { v4 as uuidv4 } from "uuid";
import { Sequelize, DataTypes } from "sequelize";
import makeModel from "../makeModel";
import BaseModel from '../BaseModel';

export interface IdentityAttributes {
  identitiy_id: string;
  user_id: string;
  username: string;
  password: string;
}

export class Identity extends BaseModel<IdentityAttributes> implements IdentityAttributes {
  identitiy_id!: string;
  user_id!: string;
  username!: string;
  password!: string;

  static associate(models: Sequelize['models']) {
    // define association here
    Identity.belongsTo(models.users, {
      foreignKey: "user_id",
    })
  }
}

export default makeModel((sequelize) => {
  Identity.init({
    identitiy_id: {
      type: DataTypes.UUID(),
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
    },
    user_id: {
      type: DataTypes.UUID(),
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'identities',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true
  });
  return Identity;
})