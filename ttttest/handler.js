const AWS = require("aws-sdk");
const express = require("express");
const serverless = require("serverless-http");

const app = express();

const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

app.use(express.json());

app.get("/posts/:postId/:userId", async function (req, res) {
  if (typeof req.params.postId !== "string") {
    res.status(400).json({ error: '"postId" must be a string' });
  }
  const params = {
    TableName: USERS_TABLE,
    Key: {
      postId: req.params.postId,
      userId: req.params.userId,
    },
  };

  try {
    const { Item } = await dynamoDbClient.get(params).promise();
    if (Item) {
      const { postId, userId, text } = Item;
      res.json({ postId, userId, text });
    } else {
      res.status(404).json({ error: 'Could not find user with provided "PostId"' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retreive post" });
  }
});

app.post("/posts", async function (req, res) {
  const { userId, postId, text } = req.body;
  if (typeof userId !== "string") {
    res.status(400).json({ error: '"userId" must be a string' });
  } else if (typeof postId !== "string") {
    res.status(400).json({ error: '"postId" must be a string' });
  } else if (typeof text !== "string") {
    res.status(400).json({ error: '"text" must be a string' });
  }

  const params = {
    TableName: USERS_TABLE,
    Item: {
      userId,
      postId,
      text,
    },
  };

  try {
    await dynamoDbClient.put(params).promise();
    res.json({ userId, postId, text });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not create post" });
  }
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
