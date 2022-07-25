// CommonJs
const fastifyPlugin = require("fastify-plugin");
const fastifyCookies = require("@fastify/cookie");

const trackingCookieName = "bztr";
const cookieValue = "v1";

async function sundewCookies(fastify, options) {
  fastify.register(fastifyCookies, {
    secret: fastify.config.SESSION_KEY,
  });

  fastify.addHook("onSend", (request, reply, payload, done) => {
    const previousCookie = request.cookies[trackingCookieName];

    // if there is no previous cookie, set one
    if (previousCookie === undefined) {
      reply.setCookie(trackingCookieName, cookieValue, {
        path: "/",
        sameSite: "none",
        signed: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60 * 24 * 365 * 4,
      });
    }

    // TODO - emit tracking event here

    done();
  });
}

module.exports = fastifyPlugin(sundewCookies);
