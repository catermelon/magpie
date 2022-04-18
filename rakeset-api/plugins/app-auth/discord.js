const fastifyPlugin = require("fastify-plugin");
const axios = require("axios");

const DiscordAPIClient = (token) =>
  axios.create({
    baseURL: "https://discord.com/api/v9/",
    maxRedirects: 0,
    headers: { Authorization: `Bearer ${token.access_token}` },
  });

async function fetchUserAndGuildData(token) {
  const client = DiscordAPIClient(token);

  return Promise.all([
    client.get("/users/@me"),
    client.get("/users/@me/guilds"),
  ]).then((result) => {
    return [result[0].data, result[1].data];
  });
}

async function appDiscordAPI(fastify, options) {
  fastify.decorate("discordAPI", {
    fetchUserAndGuildData,
  });
}

module.exports = fastifyPlugin(appDiscordAPI);
