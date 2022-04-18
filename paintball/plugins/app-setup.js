/* 
  MAIN SETUP & LOADING SCRIPT
*/

const fastifyPlugin = require("fastify-plugin");

const fastifySensible = require("fastify-sensible");
const appEnv = require("./app-env");
const appDB = require("./app-db");
const appTracking = require("./tracking");

async function appSetup(fastify, options) {
  // Have to load the config env first, or else it's not
  // available to anything else
  fastify.register(appEnv).after(() => {
    fastify.register(fastifySensible);
    fastify.register(appDB);
    fastify.register(appTracking);
  });
}

module.exports = fastifyPlugin(appSetup);
