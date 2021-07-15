import { User } from "../../models/User";
import { ResolverMap, Context } from "../../types/graphql-utils";
import bcrypt from "bcryptjs";

export const resolvers: ResolverMap = {
  Mutation: {
    register: async (
      __,
      args: GQL.IRegisterOnMutationArguments,
      { redis, req, res, session }: Context
    ) => {
      const { username, email, password } = args;
      try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
          username,
          email,
          password: hashedPassword,
        });
        console.log((user.toJSON() as any).id);
        (req.session as any).userId = (user.toJSON() as any).id;
        console.log((req.session as any).userId);
        return true;
      } catch (error) {
        //my awesome
        throw new Error(error);
      }
    },
    login: async (
      _,
      args: GQL.ILoginOnMutationArguments,
      { redis, req, res }: Context
    ) => {
      const { password, email } = args;
      try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          throw new Error("Invalid credentials");
        }
        const isValid = await bcrypt.compare(password, (user as any).password);
        if (!isValid) {
          throw new Error("Invalid credentials");
        }
        //authenticated user set the session
        (req.session as any).userId = (user.toJSON() as any).id;
        console.log((req.session as any).userId);
        return true;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Query: {
    hello: (_, __, ___) => {
      return "Hello world!";
    },
    me: async (_, __, { req, res }: Context) => {
      return User.findOne({
        where: { id: (req.session as any).userId },
        attributes: ["username", "email"],
      });
    },
  },
};
