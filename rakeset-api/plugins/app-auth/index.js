/* 
  AUTH CONFIG

*/
const fastifyPlugin = require("fastify-plugin");
const oauthSetupPlugin = require("./oauth");
const discordAPIPlugin = require("./discord");

async function appAuth(fastify, options) {
  fastify.register(oauthSetupPlugin);
  fastify.register(discordAPIPlugin);
}

module.exports = fastifyPlugin(appAuth);
