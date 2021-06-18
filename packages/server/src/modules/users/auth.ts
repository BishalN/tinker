import { makeExecutableSchema } from "graphql-tools"; // Construct a schema using the GraphQL schema language
import { User } from "../../models/User";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";

const typeDefs = `
type User {
    username: String
    id: String
    email: String
  }
  
  type Muatation {
    register(username: String!, email: String!): Boolean!
  }


  
`;
const resolvers = {
  Mutation: {
    register: async (root, args, context) => {
      const { username, email } = args;
      try {
        const user = await User.create({ username, email });
        console.log(user);
      } catch (error) {
        throw new Error("unable to register");
      }
      return true;
    },
  },
};
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
