import express from "express";
import { ApolloServer, UserInputError } from "apollo-server-express";
// import { schema } from "./test";
import { createDatabaseConnection } from "./utils/createDbConnection";
import { synchronizeDatabase, User } from "./models/User";
import { GraphQLFileLoader, loadSchema } from "graphql-tools";
import { schema } from "./modules/users/auth";

const app = express();

const main = async () => {
  await createDatabaseConnection();

  // const path = "./modules/**/*.graphql";

  await synchronizeDatabase();

  const apollo = new ApolloServer({ schema });

  apollo.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("App is listening on port 4000");
  });
};

main();
