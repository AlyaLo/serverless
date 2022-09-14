import routeUserCreate from "./route-user-create.js";
import routeUserGet from "./route-user-get.js";

const express = require("express");

function getExpressApp() {
  const app = express();
  app.get("/posts/:postId", routePostGet());
  app.post("/posts", routePostCreate());
  return app;
}

export default getExpressApp;
