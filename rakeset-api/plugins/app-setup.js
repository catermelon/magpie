/* 
  MAIN SETUP & LOADING SCRIPT

*/

const fastifyPlugin = require("fastify-plugin");

// shared plugins with no config required
//const fastifyHelmet = require("fastify-helmet");
const fastifySensible = require("fastify-sensible");

// local plugins or configured plugins
const appEnv = require("./app-env");
const appDB = require("./app-db");
const appOauth = require("./app-auth");
const appSession = require("./app-session");

async function appSetup(fastify, options) {
  fastify.register(fastifySensible);
  fastify.register(appEnv).after(() => {
    fastify.register(appDB).after(() => {
      fastify.register(appOauth);
      fastify.register(appSession);
    });
  });
}

module.exports = fastifyPlugin(appSetup);
