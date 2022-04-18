const unprotectedRoute = { config: { unprotectedRoute: true } };

async function testingRoutes(fastify, options) {
  fastify.get("/", unprotectedRoute, async function (request, reply) {
    return { msg: "ok" };
  });

  fastify.get("/verify", unprotectedRoute, async function (request, reply) {
    return { msg: "ok" };
  });
}

module.exports = testingRoutes;
