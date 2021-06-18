import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("tinker", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
  logging: (sql, timing) => {
    console.log(sql);
  },
});

export const createDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
