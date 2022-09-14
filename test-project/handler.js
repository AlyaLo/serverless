import getExpressApp from "./routes/index.js";

import routePostCreate from "./routes/route-post-create.js";
import routePostGet from "./routes/route-post-get.js";
const serverless = require("serverless-http");

const app = getExpressApp();

app.use(express.json());

app.get("/users/:userId", routeUserGet());
app.post("/users", routeUserCreate());
app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
