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

interface IUser {
username?: string | null;
email?: string | null;
}

interface IMutation {
__typename: "Mutation";
register: boolean;
login: boolean;
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
