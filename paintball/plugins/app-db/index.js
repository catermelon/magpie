const fastifyPlugin = require("fastify-plugin");
const prismaPlugin = require("./prisma");
const redisPlugin = require("./redis");

async function appDB(fastify, options) {
  fastify.register(redisPlugin);
  fastify.register(prismaPlugin);
}

module.exports = fastifyPlugin(appDB);
