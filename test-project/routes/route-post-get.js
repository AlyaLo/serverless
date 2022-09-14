import AWS from "aws-sdk";

const POSTS_TABLE = process.env.POSTS_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

export default async function (req, res) {
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
}