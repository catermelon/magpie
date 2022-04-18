const fastifyPlugin = require("fastify-plugin");
const fastifySession = require("@fastify/session");
const fastifyCookie = require("fastify-cookie");

const connectRedis = require("connect-redis");
const RedisStore = connectRedis(fastifySession);

async function appSession(fastify, options) {
  fastify.register(fastifyCookie);

  fastify.register(fastifySession, {
    secret: fastify.config.SESSION_KEY,
    cookieName: "sid",
    cookie: { secure: "auto", maxAge: 60 * 60 * 24 * 30 * 1000 },
    store: new RedisStore({
      client: fastify.redis,
    }),
  });
}

module.exports = fastifyPlugin(appSession);
