import express from "express";
import { ApolloServer } from "apollo-server-express";
import { schema } from "./test";

const app = express();

app.get("/test", async (req, res) => {
  res.send("hello world");
});

const apollo = new ApolloServer({ schema });

apollo.applyMiddleware({ app });

app.listen(4000, () => {
  console.log("App is listening on port 4000");
});
