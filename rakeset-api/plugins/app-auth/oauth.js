const fastifyPlugin = require("fastify-plugin");
const oauthPlugin = require("fastify-oauth2");

async function appDiscordOauth(fastify, options) {
  fastify.register(oauthPlugin, {
    name: "discoAuth",
    scope: ["identify", "guilds"],
    credentials: {
      client: {
        id: fastify.config.DISCORD_OAUTH_ID,
        secret: fastify.config.DISCORD_OAUTH_SECRET,
      },
      auth: oauthPlugin.DISCORD_CONFIGURATION,
    },
    // discord will redirect back to this URL, which the FE will handle
    callbackUri: fastify.config.DISCORD_OAUTH_CALLBACK_URL,
  });

}

module.exports = fastifyPlugin(appDiscordOauth);
