import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createDatabaseConnection } from "./utils/createDbConnection";
import { synchronizeDatabase } from "./models/User";
import { schema } from "./utils/createExecutableSchema";

const app = express();

const main = async () => {
  await createDatabaseConnection();

  await synchronizeDatabase();

  const apollo = new ApolloServer({ schema });

  apollo.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("App is listening on port 4000");
  });
};

main();
