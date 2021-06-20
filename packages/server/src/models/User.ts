import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/createDbConnection";

export class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

export const synchronizeDatabase = async () => {
  await sequelize.sync({ force: true }); //force it in test database
};
