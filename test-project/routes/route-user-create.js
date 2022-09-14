import AWS from "aws-sdk";

function routeUserCreate() {
  return async (req, res) => {
    const USERS_TABLE = process.env.USERS_TABLE;
    const dynamoDbClientParams = {};
    if (process.env.IS_OFFLINE) {
      dynamoDbClientParams.region = "localhost";
      dynamoDbClientParams.endpoint = "http://localhost:8000";
    }
    const dynamoDbClient = new AWS.DynamoDB.DocumentClient(dynamoDbClientParams);
    const { userId, name } = req.query;
    console.log(req);
    if (typeof userId !== "string") {
      res.status(400).json({ error: '"userId" must be a string' });
    } else if (typeof name !== "string") {
      res.status(400).json({ error: '"name" must be a string' });
    }

    const params = {
      TableName: USERS_TABLE,
      Item: {
        userId: userId,
        name: name,
      },
    };

    try {
      await dynamoDbClient.put(params).promise();
      res.json({ userId, name });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Could not create user" });
    }
  };
}

export default routeUserCreate;
