import { v4 as uuidv4 } from "uuid";
import { Sequelize, DataTypes } from "sequelize";
import makeModel from "../makeModel";
import BaseModel from "../BaseModel";

export interface UserSessionAttributes {
  session_id: string;
  access_token: string;
  refresh_token: string;
  is_valid: boolean;
  user_id: string;
  expires_at: Date;
}

export class UserSession extends BaseModel<UserSessionAttributes> implements UserSessionAttributes {
  session_id!: string;
  access_token!: string;
  refresh_token!: string;
  is_valid!: boolean;
  user_id!: string;
  expires_at!: Date

  static associate(models: Sequelize["models"]) {
    // define association here
    UserSession.belongsTo(models.users, {
      foreignKey: "user_id",
    });
  }
}

export default makeModel((sequelize) => {
  UserSession.init(
    {
      session_id: {
        type: DataTypes.UUID(),
        primaryKey: true,
        allowNull: false,
        defaultValue: () => uuidv4(),
      },
      access_token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      refresh_token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      is_valid: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      user_id: {
        type: DataTypes.UUID(),
        allowNull: false,
      },
      expires_at: {
        type: DataTypes.DATE()
      }
    },
    {
      sequelize,
      modelName: "user_sessions",
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );
  return UserSession;
});
