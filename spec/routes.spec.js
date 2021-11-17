const app = require('../server/index.js');
const request = require('supertest');

describe("Testing server routes", () => {
  jest.setTimeout(10000);
  test("GET /review - success", async () => {
    return Promise.resolve()
      .then(() => {
        return request(app)
          .get("/reviews/")
          .query({
            page: 1,
            count: 3,
            sort: "newest",
            product_id: 2
          })
          .expect(200)
          .then((response) => {
            console.log(JSON.stringify(response.body, null, 2));
            expect(response.body.product_id).toBe("2");
            expect(response.body.results.length).toBe(3);
            expect(response.body.results[0].photos.length).toBe(0);
            expect(response.body.results[1].photos.length).toBe(0);
            expect(response.body.results[2].photos.length).toBe(3);
          });
      })
  });
});