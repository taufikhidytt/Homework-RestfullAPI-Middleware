const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "0.1.0",
      description: "Documentation API Express with Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000/swagger-docs-api",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

module.exports = options;
