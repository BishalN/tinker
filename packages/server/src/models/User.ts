import { Sequelize, DataTypes, Model } from "sequelize";
const sequelize = new Sequelize("sqlite::memory");

class User extends Model {}
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
  },
  {
    sequelize, // We need to pass the connection instance
    modelName: "User", // We need to choose the model name
  }
);

export const synchronizeDatabase = async () => {
  await sequelize.sync({ force: true });
};

// the defined model is the class itself
console.log(User === sequelize.models.User); // true
