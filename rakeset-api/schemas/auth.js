const authVerifyRequestSchema = {
  body: {
    type: "object",
    required: ["code", "state"],
    properties: {
      code: { type: "string" },
      state: { type: "string" },
    },
  },
};

const sessionGetRequestSchema = {
  body: { type: "null" },
};

const sessionGetResponseSchema = {
  response: {
    200: {
      type: "object",
      properties: {
        statusCode: { type: "number" },
        code: { type: "string" },
        error: { type: "string" },
        message: { type: "string" },
        time: { type: "string" },
      },
    },
  },
};

module.exports = {
  verify: {
    post: {
      request: authVerifyRequestSchema,
    },
  },
  session: {
    get: {
      request: sessionGetRequestSchema,
      response: sessionGetResponseSchema,
    },
  },
};
