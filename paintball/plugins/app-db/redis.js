const fp = require("fastify-plugin");
const fastifyRedis = require("@fastify/redis");

async function redisPlugin(fastify, options, done) {
  fastify.register(fastifyRedis, {
    host: fastify.config.REDIS_HOST,
    port: fastify.config.REDIS_PORT,
    family: 4,
  });
}

module.exports = fp(redisPlugin);
