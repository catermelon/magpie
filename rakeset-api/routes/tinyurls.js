async function tinyURLRoutes(fastify, options) {
  fastify.get("/", options, async function (request, reply) {
    // TODO paginate
    const records = await fastify.prisma.tinyURL.findMany({
      where: {
        deleted: {
          equals: false,
        },
      },
    });
    reply.send({ result: records });
  });

  fastify.post("/", options, async function (request, reply) {
    console.log(request.body);

    await fastify.prisma.tinyURL.create({
      data: {
        id: request.body.key,
        url: request.body.redirect,
        userId: request.session.user.id,
      },
    });

    // FIXME - error handling
    reply.status(201).send();
  });
}

module.exports = tinyURLRoutes;
