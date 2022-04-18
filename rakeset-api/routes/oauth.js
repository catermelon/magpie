const FIXME_HARDCODED_DISCORD_ID = "950981090779209798";

const unprotectedRoute = { config: { unprotectedRoute: true } };

function meetsGuildRequirements(userGuilds) {
  // This checks if the user is in the required discord(s)
  return userGuilds.some((guild) => guild.id === FIXME_HARDCODED_DISCORD_ID);
}

async function oauthRoutes(fastify, options) {
  fastify.register((fastify, options, done) => {
    /* generate the discord oauth redirect url. the FE fetches this via AJAX */
    fastify.get("/", unprotectedRoute, async (req, reply) => {
      const discordOauthURL = fastify.discoAuth.generateAuthorizationUri(req);
      reply.send({ redirectTo: discordOauthURL });
    });

    /* 
      this verifies with discord that the token is valid, and then
      queries the discord API for the user's username & what guilds (discords)
      they're in. 
    */
    fastify.post("/verify", unprotectedRoute, async (req, reply) => {
      try {
        const token =
          await fastify.discoAuth.getAccessTokenFromAuthorizationCodeFlow(req);

        const [userData, guildData] =
          await fastify.discordAPI.fetchUserAndGuildData(token);

        if (!meetsGuildRequirements(guildData)) {
          // FIXME - throw better error
          throw new Error("not in the right discord");
        }

        // upsert user
        const user = await fastify.prisma.user.upsert({
          where: { id: userData.id },
          update: { username: userData.username, avatar: userData.avatar },
          create: {
            id: userData.id,
            username: userData.username,
            avatar: userData.avatar,
          },
        });

        // FIXME - DRY this
        req.session.user = user;
        req.session.authenticated = true;

        reply.send({ id: user.id, username: user.username });
      } catch (error) {
        console.log(error);
        reply.badRequest(error.message);
      }
    });
    done();
  });
}

module.exports = oauthRoutes;
