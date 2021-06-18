import express from "express";
import { ApolloServer } from "apollo-server-express";
import { schema } from "./test";
import { createDatabaseConnection } from "./utils/createDbConnection";

const app = express();

const main = async () => {
  await createDatabaseConnection();

  const apollo = new ApolloServer({ schema });

  apollo.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("App is listening on port 4000");
  });
};

main();
