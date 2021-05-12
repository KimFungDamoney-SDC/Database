process.env.NODE_ENV = "test";
// const expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../server/index.js');
const request = supertest(app);

describe("GET /products", () => {
  test("It responds with an array of products", async () => {
    const response = await request.get("/products");
    expect(response.statusCode).toBe(200)
  });
})