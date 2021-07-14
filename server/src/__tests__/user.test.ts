import supertest from "supertest";
import faker from "faker";

const url = "http://localhost:4000";
const request = supertest(url);

faker.seed(Date.now() + 5);
const username = faker.internet.userName();
const email = faker.internet.email();
const password = faker.internet.password();

async function registerUser(username, email, password) {
  const response = await request.post("/graphql").send({
    query: `
  mutation {
    register(
      username:"${username}"
      email:"${email}"
      password:"${password}"
      )
  }
  `,
  });

  return response.body;
}

async function loginUser(email, password) {
  const response = await request.post("/graphql").send({
    query: `
  mutation {
    login(
      email:"${email}",
      password:"${password}"
    )
  }
  
  `,
  });

  return response.body;
}

describe("user test", () => {
  it("registers the user", async () => {
    const body = await registerUser(username, email, password);

    const {
      data: { register },
    } = body;

    expect(register).toBeTruthy();
  });

  it("throws an error of email already in use constraint", async () => {
    const body = await registerUser(username, email, password);

    const { errors } = body;

    expect(errors.length).toBeGreaterThan(0);
  });

  it("logs the user in successfully", async () => {
    const body = await loginUser(email, password);

    const {
      data: { login },
    } = body;

    expect(login).toBeTruthy();
  });

  it("throws an error Invalid credential", async () => {
    const body = await loginUser(email, "thisiswrong");

    const { errors } = body;
    const message = errors[0].message;

    expect(message).toBe("Error: Invalid credentials");
  });
});
