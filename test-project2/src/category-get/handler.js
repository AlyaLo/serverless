import AWS from "aws-sdk";
import { StatusCodes } from "http-status-codes";

async function getPosts({ categoryId, dynamoDb, lastEvaluatedKey = undefined }) {
  const result = await dynamoDb
    .query({
      ExpressionAttributeValues: {
        ":categoryId": categoryId,
      },
      ExpressionAttributeNames: {
        "#categoryId": "categoryId",
      },
      KeyConditionExpression: "#categoryId = :categoryId",
      Select: "ALL_ATTRIBUTES",
      TableName: process.env.CATEGORIES_TABLE,
    })
    .promise();
  if (!result.LastEvaluatedKey) {
    return result.Items;
  }
  return [...result.Items, ...(await getPosts({ categoryId, dynamoDb, lastEvaluatedKey: result.LastEvaluatedKey }))];
}

const handler = async (event) => {
  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    const categoryId = event.pathParameters?.categoryId;
    const result = await getPosts({ categoryId, dynamoDb });
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: StatusCodes.OK,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: StatusCodes.BAD_REQUEST,
      body: error.message,
    };
  }
};

export default handler;
