import routeUserCreate from "./route-user-create.js";
import routeUserGet from "./route-user-get.js";
import routePostCreate from "./route-post-create.js";
import routePostGet from "./route-post-get.js";
import express from "express";

function getRoutes() {
  const app = express.Router({ mergeParams: true });
  app.get("/users/:userId", routeUserGet());
  app.post("/users", routeUserCreate());
  app.get("/posts/:postId", routePostGet());
  app.post("/posts", routePostCreate());
  return app;
}

export default getRoutes;
