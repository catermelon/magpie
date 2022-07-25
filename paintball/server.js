// Require the framework
const fastify = require("fastify")({
  exposeHeadRoutes: true,
  logger: {
    transport:
      process.env.NODE_ENV === "development"
        ? {
            target: "pino-pretty",
            options: {
              translateTime: "HH:MM:ss Z",
              ignore: "pid,hostname",
            },
          }
        : undefined,
  },
});

const appSetup = require("./plugins/app-setup");
const appRoutes = require("./routes");

fastify.register(appSetup).after(() => {
  fastify.register(appRoutes);
});

const start = async () => {
  try {
    if (!("NODE_ENV" in process.env)) {
      throw new Error(
        "NODE_ENV not set. You have to set this so we know what files to load."
      );
    }
    await fastify.ready();

    // and this starts the listener
    await fastify.listen({ port: fastify.config.PORT });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
