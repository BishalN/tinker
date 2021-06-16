import { makeExecutableSchema } from "graphql-tools"; // Construct a schema using the GraphQL schema language
const typeDefs = `
  type Query {
    hello: String
  }
`; // Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: (root, args, context) => {
      return "Hello world!";
    },
  },
}; // Get a GraphQL.js Schema object
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
