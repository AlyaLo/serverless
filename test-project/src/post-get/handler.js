import AWS from "aws-sdk";

const handler = async (event) => {
  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    const categoryId = event.pathParameters?.categoryId;
    const result = await dynamoDb
      .scan({
        ExclusiveStartKey: lastEvaluatedKey,
        ExpressionAttributeValues: {
          ":categoryId": { S: categoryId },
        },
        FilterExpression: "categoryId = :categoryId",
        Select: "ALL_ATTRIBUTES",
        TableName: process.env.POSTS_TABLE,
      })
      .promise();
    if (!result.LastEvaluatedKey) {
      return result.Items;
    }
  } catch (error) {
    return {
      error: {
        message: error.message,
        type: error.type,
      },
    };
  }
};
