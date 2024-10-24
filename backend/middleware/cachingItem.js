import redisClient from '../redis.js';

// Middleware to cache data
const cache = (req, res, next) => {
    const key = req.originalUrl;
    console.log("key: ", key);

    redisClient.get(key, (err, data) => {
        if (err) throw err;

        if (data) {
            // Cache hit: Send the cached response
            res.send(JSON.parse(data));
        } else {
            // Cache miss: Proceed to the next middleware
            next();
        }
    });
};

export default cache;