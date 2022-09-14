import getExpressApp from "./routes/index.js";
import serverless from "serverless-http";
import express from "express";


module.exports.handler = serverless(getExpressApp());
