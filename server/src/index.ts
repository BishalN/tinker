import express from "express";
import { ApolloServer } from "apollo-server-express";
import session from "express-session";
import connectRedis from "connect-redis";

import { createDatabaseConnection } from "./utils/createDbConnection";
import { synchronizeDatabase } from "./models/User";
import { schema } from "./utils/createExecutableSchema";
import { redis } from "./utils/redis";

const RedisStore = connectRedis(session as any);

export const app = express();

const main = async () => {
  await createDatabaseConnection();
  await synchronizeDatabase();

  app.use(
    session({
      secret: "hfjdhfhdfjh",
      store: new RedisStore({ client: redis }),
      name: "qid",
      saveUninitialized: false,
      resave: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7, //7 days
      },
    })
  );

  const apollo = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({
      req,
      res,
      redis,
    }),
  });

  apollo.applyMiddleware({
    app,
    cors: { origin: "http://localhost:3000", credentials: true },
  });

  app.listen(4000, () => {
    console.log("App is listening on port 4000");
  });
};

main();
