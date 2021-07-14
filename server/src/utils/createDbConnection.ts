import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DATABASE,
  "postgres",
  "postgres",
  {
    host: "localhost",
    dialect: "postgres",

    logging: (sql, timing) => {
      console.log(sql);
    },
  }
);

export const createDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export const closeDatabaseConnection = async () => {
  try {
    await sequelize.close();
    console.log("conenction closed successfully");
  } catch (error) {
    console.log("connection close failed:", error);
  }
};
