// tslint:disable
// graphql typescript definitions

declare namespace GQL {
interface IGraphQLResponseRoot {
data?: IQuery | IMutation;
errors?: Array<IGraphQLResponseError>;
}

interface IGraphQLResponseError {
/** Required for all errors */
message: string;
locations?: Array<IGraphQLResponseErrorLocation>;
/** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
[propName: string]: any;
}

interface IGraphQLResponseErrorLocation {
line: number;
column: number;
}

interface ITaskInput {
task: string;
status?: string | null;
}

interface ITask {
__typename: "Task";
id: string;
task: string;
status: string;
}

interface IMutation {
__typename: "Mutation";
createTask: ITask;
register: boolean;
login: boolean;
}

interface ICreateTaskOnMutationArguments {
task?: ITaskInput | null;
}

interface IRegisterOnMutationArguments {
username: string;
email: string;
password: string;
}

interface ILoginOnMutationArguments {
email: string;
password: string;
}

interface IUser {
username?: string | null;
email?: string | null;
}

interface IUserOutput {
__typename: "UserOutput";
username: string | null;
email: string | null;
}

interface IQuery {
__typename: "Query";
hello: string | null;
me: IUserOutput | null;
}
}

// tslint:enable
