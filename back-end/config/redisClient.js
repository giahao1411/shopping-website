const Redis = require("ioredis");

const redisClient = new Redis({
    host: process.env.REDIS_HOST || "shopping-redis",
    port: process.env.REDIS_PORT || 6379,
    retryStrategy(times) {
        if (times > 10) {
            return null;
        }
        return Math.min(times * 2000, 10000);
    },
});

redisClient.on("connect", () => {
    console.log("Connected to Redis");
});

redisClient.on("error", (err) => {
    console.error("Redis error:", err);
});

module.exports = { redisClient };
