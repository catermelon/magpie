const fastifyPlugin = require("fastify-plugin");
const sessionRoutes = require("./session");
const oauthRoutes = require("./oauth");

const tinyurlRoutes = require("./tinyurls");

const testingRoutes = require("./testing");

async function appRoutes(fastify, options) {
  fastify.register(sessionRoutes, {
    prefix: "/session",
  });
  fastify.register(oauthRoutes, { prefix: "/auth" });

  fastify.register(tinyurlRoutes, { prefix: "/urls" });

  fastify.register(testingRoutes);

  // This is the authentication protection
  fastify.addHook("onRequest", (request, reply, next) => {
    if (
      reply.context.config.unprotectedRoute === true ||
      request.session.authenticated === true
    ) {
      next();
    } else {
      reply.unauthorized("You are not authenticated");
    }
  });
}

module.exports = fastifyPlugin(appRoutes);
