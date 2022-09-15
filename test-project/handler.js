import getExpressApp from "./routes/index.js";
import serverless from "serverless-http";
import express from "express";

const handler = async (event, context) => {
  try {
    return await serverless(getExpressApp())(event, context);
  } catch (e) {
    console.log(e);
  }
};

export default handler;
