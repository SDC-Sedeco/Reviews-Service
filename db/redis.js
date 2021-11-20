
const DEFAULT_EXPIRATION = process.env.DEFAULT_EXPIRATION || 3600; // Default expiration will be one hour

const Redis = require('redis');
const redisClient = Redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PW
});

const getOrSetCache = function (key, cb) {
  return new Promise(async (resolve, reject) => {
    redisClient.get(key, async (error, data) => {
      if (error) {
        return reject(error);
      } else if (data !== null) {
        console.log("Found in cache!");
        return resolve(JSON.parse(data));
      } else {
        console.log("Not found in cache!");
        const newData = await cb();
        JSON.stringify(newData, null, 2);
        redisClient.setex(key, DEFAULT_EXPIRATION, JSON.stringify(newData), (err, reply) => {
          if (err) {
            console.log('ERROR!', err);
          } else {
            console.log('Redis response:', reply);
          }
        });
        resolve(newData);
      }
    })
  })
}

const removeProductFromCache = function(product_id) {
  const sortOptions = ['newest', 'helpful', 'relevant'];
  const possibilities = sortOptions.map(option => `reviews?product_id=${product_id}&sort=${option}`);
  possibilities.push(`meta?product_id=${product_id}`);
  possibilities.forEach((possibility) => {
    redisClient.del(possibility, (err, reply) => {
      if (err) {
        console.log('ERROR!', err);
      } else if (reply) {
        console.log('Redis reply:', reply);
      }
    });
  });
}

module.exports = {getOrSetCache, removeProductFromCache};