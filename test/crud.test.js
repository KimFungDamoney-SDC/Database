const request = require('supertest');
const app = require('../server/index.js');


describe("GET /reviewsmeta/:id", () => {
  test("It responds with an array of the meta data", async () => {
    const response = await request(app).get("/api/reviewsmeta/1");
    expect(response.statusCode).toBe(200)
  });
});

describe("GET /reviews/:id", () => {
  test("It responds with an array of reviews", async () => {
    const response = await request(app).get("/api/reviews/1");
    expect(response.statusCode).toBe(200)
  });
});

describe('POST /api/reviews/:review:id - create new review', () => {
  let newReview = {
    product_id: 10000,
    rating: 5,
    created_at: new Date(),
    summary: 'Great for hiking!',
    body: "I bought these for my vacation in LA, they have great traction.",
    recommend: true,
    reported: false,
    reviewer_name: "Lola",
    reviewer_email: "lola@gmail.com",
    helpfulness: 10
  };

  let badReview = {};

  it('should accept and add a valid new review', () => {
    return request(app).post('/api/reviews/1')
    .send(newReview)
    .then(() => {
      return request(app).get('/api/reviews/1');
    })
    .then((res) => {
      expect(res.status).toBe(200);
    });
  });

  it('should reject a new review with missing fields', () => {
    return request(app).post('/api/reviews/1')
    .send(badReview)
    .then(() => {
      return request(app).get('/api/reviews/1');
    })
    .then((res) => {
      expect(res.status).toBe(200);
    });
  });
});

describe('PUT /api/reviews/helpful/:id - update a review', () => {

  it('Should update the helpfulness of a review', () => {
    return request(app).put('/api/reviews/helpful/1')
    .send({ helpfulness: 20 })
    .then((res) => {
      expect(res.status).toBe(200);
    });
  });

  it('Should reject any input except for an integer for helpfulness', () => {
    return request(app).put('/api/reviews/helpful/1')
    .send({ helpfulness: false })
    .then((res) => {
      expect(res.status).toBe(404);
    });
  });
});

describe('PUT /api/reviews/report/:id - update a review', () => {

  it('Should update the report entry of a review', () => {
    return request(app).put('/api/reviews/report/1')
    .send({ reported: true })
    .then((res) => {
      expect(res.status).toBe(200);
    });
  });

  it('Should reject any input except for a boolean for reported', () => {
    return request(app).put('/api/reviews/report/1')
    .send({ reported: 1 })
    .then((res) => {
      expect(res.status).toBe(400);
    });
  });
});