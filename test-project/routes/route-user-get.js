import AWS from "aws-sdk";

function routeUserGet() {
  return async (req, res) => {
    const USERS_TABLE = process.env.USERS_TABLE;
    const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
    const params = {
      TableName: USERS_TABLE,
      Key: {
        userId: req.params.userId,
      },
    };

    try {
      const { Item } = await dynamoDbClient.get(params).promise();
      if (Item) {
        const { userId, name } = Item;
        res.json({ userId, name });
      } else {
        res.status(404).json({ error: 'Could not find user with provided "userId"' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Could not retreive user" });
    }
  };
}
export default routeUserGet;
