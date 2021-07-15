import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/createDbConnection";
import { User } from "./User";

export class Task extends Model {}
Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    task: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    //"Active" | "Completed" | "Archived"
    status: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "Active",
    },
  },
  {
    sequelize,
    modelName: "Task",
  }
);
