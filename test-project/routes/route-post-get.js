import AWS from "aws-sdk";


function routePostGet() {
  return async (req, res) => {
    const POSTS_TABLE = process.env.POSTS_TABLE;
    const dynamoDbClientParams = {};
    if (process.env.IS_OFFLINE) {
      dynamoDbClientParams.region = "localhost";
      dynamoDbClientParams.endpoint = "http://localhost:8000";
    }
    const dynamoDbClient = new AWS.DynamoDB.DocumentClient(dynamoDbClientParams);
    const params = {
      TableName: POSTS_TABLE,
      Key: {
        postId: req.params.postId,
      },
    };

    try {
      const { Item } = await dynamoDbClient.get(params).promise();
      if (Item) {
        const { text, postId, userId } = Item;
        res.json({ text, postId, userId });
      } else {
        res.status(404).json({ error: 'Could not find user with provided "postId"' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Could not retreive post" });
    }
  };
}
export default routePostGet;
