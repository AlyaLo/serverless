import getExpressApp from "../test-project/routes/index.js";

const serverless = require("serverless-http");

const app = getExpressApp();


app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});


module.exports.handler = serverless(app);
