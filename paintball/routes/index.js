async function appRoutes(fastify, options) {
  fastify.get("/", options, async function (request, reply) {
    reply.send({ msg: "ok" });
  });

  fastify.get("/:urlKey", options, async function (request, reply) {
    // By ID

    const redirect = await fastify.prisma.tinyURL.findUnique({
      where: {
        id: request.params.urlKey,
      },
    });

    if (redirect === null || redirect === undefined) {
      reply.notFound();
    } else {
      reply
        .code(301)
        .headers({
          "Cache-Control": "private, max-age=0, no-store",
          Vary: "*",
        })
        .redirect(redirect.url);
    }
  });
}

module.exports = appRoutes;
