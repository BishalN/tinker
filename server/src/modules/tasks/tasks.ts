import { ResolverMap, Context } from "../../types/graphql-utils";
import { Task } from "../../models/Tasks";

export const resolvers: ResolverMap = {
  Mutation: {
    createTask: async (
      __,
      args,
      { redis, req, res, session }: Context
    ): Promise<Task> => {
      if (!(req.session as any).userId) throw new Error("Unauthorized");
      console.log((req.session as any).userId + "jjjj");
      try {
        const createdTask = await Task.create({
          task: args.task.task,
          status: args.task.status,
          userId: (req.session as any).userId,
        });
        console.log(createdTask.toJSON());
        return createdTask;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Query: {
    getTasks: async (_, __, { req, res }: Context) => {
      if (!(req.session as any).userId) throw new Error("Unauthorized");
      console.log((req.session as any).userId + "sdsds");
      const userId = (req.session as any).userId;
      const tasks = await Task.findAll({ where: { UserId: userId } });
      return tasks;
    },
  },
};
