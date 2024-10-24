import redis from 'redis';

// Initialize Redis client
const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
});

export default redisClient;