process.env.NODE_ENV = "test";
const request = require('supertest');
const app = require('../server/index.js');
const router = require('../server/router.js');

describe("GET /reviews/:id", () => {
  test("It responds with an array of reviews", async () => {
    const response = await request(app).get("/api/reviews/1");
    expect(response.statusCode).toBe(200)
  });
});

describe("GET /reviewsmeta/:id", () => {
  test("It responds with an array of the meta data", async () => {
    const response = await request(app).get("/api/reviewsmeta/1");
    expect(response.statusCode).toBe(200)
  });
});

describe("POST /reviews/:id", () => {
  test("It responds with a newly created review", async () => {
    const newReview = await request(app)
      .post("/reviews/1")
      .send({
        id: 10000
      })
    expect(request.body).toHaveProperty("id")
    expect(newReview.statusCode).toBe(200);

    const response = await request(app).get("/api/reviews/1");
    expect(response.body.length).toBe(1)
  });
});

describe("PATCH /reviews/helpful/:id", () => {
  test("It responds with a newly updated review", async () => {
    const newReview = await request(app)
      .post("/api/reviews/helpful/1")
      .send({
          helpfulness: 7
      })
    const updatedReview = await request(app)
      .patch(`/api/reviews/helpful/${newReview.body.id}`)
      .send({
          helpfulness: "updated"
      })
    expect(updatedReview.body.helpfulness).toBe("updated");
    expect(updatedReview.body).toHaveProperty("id");
    expect(updatedReview.statusCode).toBe(200)

    const response = await request(app).get("/api/reviews/1");
    expect(response.body.length).toBe(1);
  });
});

describe("PATCH /reviews/report/:id", () => {
  test("It responds with a newly updated review", async () => {
    const newReview = await request(app)
      .post("/api/reviews/report/1")
      .send({
          reported: null
      })
    const updatedReview = await request(app)
      .patch(`/api/reviews/report/1`)
      .send({
          reported: "updated"
      })
    expect(updatedReview.body.helpfulness).toBe("updated");
    expect(updatedReview.body).toHaveProperty("id");
    expect(updatedReview.statusCode).toBe(200)

    const response = await request(app).get("/reviews/1");
    expect(response.body.length).toBe(1);
  });
});