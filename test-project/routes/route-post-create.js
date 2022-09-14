import AWS from "aws-sdk";

function routePostCreate() {
  return async (req, res) => {
    const POSTS_TABLE = process.env.POSTS_TABLE;
    const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
    const { text, postId, userId } = req.body;
    if (typeof userId !== "string") {
      res.status(400).json({ error: '"userId" must be a string' });
    } else if (typeof postId !== "string") {
      res.status(400).json({ error: '"postId" must be a string' });
    } else if (typeof text !== "string") {
      res.status(400).json({ error: '"text" must be a string' });
    }

    const params = {
      TableName: POSTS_TABLE,
      Item: {
        postId: postId,
        text: text,
        userId: userId,
      },
    };

    try {
      await dynamoDbClient.put(params).promise();
      res.json({ text, postId, userId });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Could not create user" });
    }
  };
}

export default routePostCreate;
