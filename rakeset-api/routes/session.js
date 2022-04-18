async function sessionRoutes(fastify, options) {
  // Query this route to check if a session is valid
  fastify.get("/", async (req, reply) => {
    req.session.touch();
    reply.send({ username: req.session.user.username });
  });
}

module.exports = sessionRoutes;
