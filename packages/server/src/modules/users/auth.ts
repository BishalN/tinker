import { User } from "../../models/User";
import { ResolverMap } from "../../types/graphql-utils";

export const resolvers: ResolverMap = {
  Mutation: {
    register: async (__, args: GQL.IRegisterOnMutationArguments, context) => {
      const { username, email } = args;
      const user = await User.create({ username, email });
      return true;
    },
  },
  Query: {
    hello: (_, __, ___) => {
      return "Hello world!";
    },
  },
};
