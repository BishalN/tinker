// ./graphql/typeDefs.js
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { mergeResolvers } from "@graphql-tools/merge";
import { makeExecutableSchema } from "apollo-server-express";
import { print } from "graphql";
import path from "path";
import fs from "fs";

const typesArray = loadFilesSync(
  path.join(__dirname, "../modules/**/*.graphql"),
  {
    extensions: ["graphql"],
  }
);

const typeDefs = mergeTypeDefs(typesArray);

const resolversArray = loadFilesSync(
  path.join(__dirname, "../modules/**/*.ts"),
  {
    extensions: ["ts"],
  }
);

const resolvers = mergeResolvers(resolversArray);

export const schema = makeExecutableSchema({ typeDefs, resolvers });
