const envConfigSchema = {
  type: "object",
  required: [
    "NODE_ENV",
    "PORT",
    "SESSION_KEY",
    "DISCORD_OAUTH_CALLBACK_URL",
    "DISCORD_OAUTH_ID",
    "DISCORD_OAUTH_SECRET",
    "REDIS_HOST",
    "REDIS_PORT",
  ],
  properties: {
    NODE_ENV: {
      type: "string",
    },
    PORT: {
      type: "number",
    },
    SESSION_KEY: {
      type: "string",
    },
    DISCORD_OAUTH_CALLBACK_URL: {
      type: "string",
    },
    DISCORD_OAUTH_ID: {
      type: "string",
    },
    DISCORD_OAUTH_SECRET: {
      type: "string",
    },
    REDIS_HOST: {
      type: "string",
    },
    REDIS_PORT: {
      type: "number",
    },
  },
  additionalProperties: false,
};

module.exports = envConfigSchema;
