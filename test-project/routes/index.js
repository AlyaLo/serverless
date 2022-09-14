import express from "express";
import getRoutes from "./routes.js";
function getExpressApp() {
  const app = express();
  app.use("/api/", getRoutes());
  return app;
}

export default getExpressApp;
