process.env.NODE_ENV = "test";
const request = require('supertest');
const app = require('../server/index.js');
const db = require("../database/index.js");

describe("GET /reviews/:id", () => {
  test("It responds with an array of reviews", async () => {
    const response = await request(app).get("/reviews/:id");
    expect(response.statusCode).toBe(200)
  });
});

describe("GET /reviewsmeta/:id", () => {
  test("It responds with an array of the meta data", async () => {
    const response = await request(app).get("/reviewsmeta/:id");
    expect(response.statusCode).toBe(200)
  });
});

describe("POST /reviews/:id", () => {
  test("It responds with a newly created review", async () => {
    const response = await request(app).post("/reviews/:id");
    expect(response.statusCode).toBe(200)
  });
});

describe("PUT /reviews/helpful/:id", () => {
  test("It responds with a newly updated review", async () => {
    const response = await request(app).put("/reviews/helpful/:id");
    expect(response.statusCode).toBe(200)
  });
});

describe("PUT /reviews/report/:id", () => {
  test("It responds with a newly updated review", async () => {
    const response = await request(app).put("/reviews/report/:id");
    expect(response.statusCode).toBe(200)
  });
});

