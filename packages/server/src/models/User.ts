import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/createDbConnection";

export class User extends Model {}
User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

export const synchronizeDatabase = async () => {
  await sequelize.sync({ force: true });
};
