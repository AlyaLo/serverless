import getExpressApp from "./routes/index.js";
import serverless from "serverless-http";

const app = getExpressApp();

app.use(express.json());

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
