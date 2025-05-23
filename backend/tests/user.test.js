const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app.js");
const User = require("../models/userModel.js");
require("dotenv").config();

let mongoServer;
let token;
let userId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
  mongoose.set("strictQuery", true);
});

afterAll(async () => {
  await User.deleteMany({});
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("User Routes", () => {
  test("Should sign up a new user", async () => {
    const res = await request(app).post("/users/signup").send({
      name: "Test User",
      email: "test@example.com",
      password: "Password123",
      phone: "1234567890",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.name).toBe("Test User");

    token = res.body.token;
    userId = res.body.user.id;
  });

  test("Should login with correct credentials", async () => {
    const res = await request(app).post("/users/login").send({
      email: "test@example.com",
      password: "Password123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test("Should get all users", async () => {
    const res = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("Should get user by ID", async () => {
    const res = await request(app)
      .get(`/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe("test@example.com");
  });

  test("Should update user", async () => {
    const res = await request(app).put(`/users/${userId}`).send({
      name: "Updated Name",
      phone: "9876543210",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.user.name).toBe("Updated Name");
  });

  test("Should delete user", async () => {
    const res = await request(app).delete(`/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User deleted successfully");
  });

  test("Should delete all users", async () => {
    await request(app).post("/users/signup").send({
      name: "Another User",
      email: "another@example.com",
      password: "Password123",
      phone: "1111111111",
    });

    const res = await request(app).delete("/users");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("All users deleted successfully");
  });
});
