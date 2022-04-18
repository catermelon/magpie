const fp = require("fastify-plugin");
const { PrismaClient } = require("@prisma/client");

async function prismaPlugin(fastify, options) {
  const prisma = new PrismaClient();
  fastify.decorate("prisma", prisma);
}

module.exports = fp(prismaPlugin);
