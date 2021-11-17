import http from 'k6/http';
import { Trend } from 'k6/metrics';

const metaTrend = new Trend('PX_TREND_meta');
const reviewsTrend = new Trend('PX_TREND_reviews');

// k6 run spec/GET.spec.px.js -e TYPE=X
const TEST_TYPE = __ENV.TYPE || "smoke";
const STRESS_MAX_USERS = __ENV.STRESS_MAX_USERS || 100;

// k6 run spec/GET.spec.px.js -e NUM_OF_ITERATIONS=X
const NUM_OF_ITERS = __ENV.NUM_OF_ITERATIONS || 5;

const smokeOptions = {
  scenarios: {
    meta: {
      executor: "per-vu-iterations",
      exec: "metaTest",
      vus: 1,
      iterations: NUM_OF_ITERS,
      gracefulStop: "0s",
    },
    reviews: {
      executor: "per-vu-iterations",
      exec: "reviewsTest",
      vus: 1,
      startTime: `${NUM_OF_ITERS * 2}s`,
      iterations: NUM_OF_ITERS,
      gracefulStop: "0s",
    }
  }
}

const stressOptions = {
  stages: [
    {duration: '5m', target: Math.ceil(parseInt(STRESS_MAX_USERS) / 2)},
    {duration: '10m', target: Math.ceil(parseInt(STRESS_MAX_USERS) / 2)},
    {duration: '5m', target: STRESS_MAX_USERS},
    {duration: '10m', target: STRESS_MAX_USERS},
    {duration: '5m', target: Math.ceil(parseInt(STRESS_MAX_USERS) / 2)},
    {duration: '10m', target: Math.ceil(parseInt(STRESS_MAX_USERS) / 2)},
    {duration: '5m', target: 0}
  ]
}

export var options;

switch(TEST_TYPE) {
  // Smoke: Run the tests with one VU a couple times
  // Make sure the tests don't overlap
  case "stress":
    options = stressOptions;
    break;
  case "smoke":
  default:
    options = smokeOptions;
    break;
}

console.log("Test type:", TEST_TYPE);

export default function () {
  metaTest();
  reviewsTest();
}

export function metaTest () {
  let product = ((__ITER + __VU) % 100000) + 900000 || 1000000;
  console.log('GET /reviews/meta/ || id:', product);
  const resp = http.get(`http://localhost:3000/reviews/meta?product_id=${product}`);
  metaTrend.add(resp.timings.duration);
}

export function reviewsTest () {
  let product = ((__ITER + __VU) % 100000) + 900000 || 1000000;
  let sort = "newest";
  console.log('GET /reviews/ || id:', product);
  let query = `product_id=${product}&sort=${sort}`
  const resp = http.get(`http://localhost:3000/reviews?${query}`);
  reviewsTrend.add(resp.timings.waiting);
}
