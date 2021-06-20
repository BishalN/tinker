import { Redis } from "ioredis";
import express from "express";

export interface Session {
  userEmail?: string;
}

export interface Context {
  redis: Redis;
  // url: string;
  session: Session;
  req: Express.Request;
  res: Express.Response;
}

export type Resolver = (
  parent: any,
  args: any,
  context: Context,
  info: any
) => any;

export type GraphQLMiddlewareFunc = (
  resolver: Resolver,
  parent: any,
  args: any,
  context: Context,
  info: any
) => any;

export interface ResolverMap {
  [key: string]: {
    [key: string]: Resolver | { [key: string]: Resolver };
  };
}
