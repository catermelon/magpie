const envConfigSchema = {
  type: "object",
  required: [
    "NODE_ENV",
    "PORT",
    "SESSION_KEY",
    "REDIS_HOST",
    "REDIS_PORT",
    "DATABASE_URL",
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
    REDIS_HOST: {
      type: "string",
    },
    REDIS_PORT: {
      type: "number",
    },
    DATABASE_URL: {
      type: "string",
    },
  },
  additionalProperties: false,
};

module.exports = envConfigSchema;
