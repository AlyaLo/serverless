import routeUserCreate from "./route-user-create.js";
import routeUserGet from "./route-user-get.js";
import routePostCreate from "./route-post-create.js";
import routePostGet from "./route-post-get.js";

const express = require("express");

function getExpressApp() {
  const app = express();
  app.use(express.json());
  app.get("/posts/:postId", routePostGet());
  app.post("/posts", routePostCreate());
  app.get("/users/:userId", routeUserGet());
  app.post("/users", routeUserCreate());
  return app;
}

export default getExpressApp;
