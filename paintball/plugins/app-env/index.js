/* 
  CONFIG LOADING

  This 
    (1) throws an error if NODE_ENV is not set
    (2) loads the env config variables for that env
  
*/
const fastifyPlugin = require("fastify-plugin");
const fastifyEnv = require("@fastify/env");

const envConfigSchema = require("../../env-schema");

const useEnvFilesInDevOnly = process.env.NODE_ENV === "development";

async function appEnv(fastify, options) {
  // throw error if NODE_ENV isn't set
  if (!("NODE_ENV" in process.env)) {
    throw new Error("NODE_ENV not set. Run this with ./dev or npm run prod");
  }

  fastify.register(fastifyEnv, {
    confKey: "config", // access properties at fastify.config
    schema: envConfigSchema,
    dotenv: useEnvFilesInDevOnly,
  });
}

module.exports = fastifyPlugin(appEnv);
