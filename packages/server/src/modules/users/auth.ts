import { makeExecutableSchema } from "graphql-tools"; // Construct a schema using the GraphQL schema language
import { User } from "../../models/User";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";

const typeDefs = `

type Query {
    hello: String
  }

  input User {
      username:String
      email: String
  }
  
  type Mutation {
    register(user:User): Boolean!
  }  

  
`;
const resolvers = {
  Mutation: {
    register: async (root, args, context) => {
      const { username, email } = args.user;
      console.log(username, email);
      const user = await User.create({ username, email });

      return true;
    },
  },
  Query: {
    hello: (root, args, context) => {
      return "Hello world!";
    },
  },
};
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
