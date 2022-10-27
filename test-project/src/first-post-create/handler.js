import AWS from "aws-sdk";
import { StatusCodes } from "http-status-codes";
import { v4 as uuidv4 } from "uuid";

const handler = async (event) => {
  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    const { categoryId, userName, text } = event.detail;
    const params = {
      Item: {
        categoryId: categoryId,
        creationDate: new Date().toISOString(),
        id: uuidv4(),
        text: text,
        userName: userName,
      },
      TableName: process.env.POSTS_TABLE,
    };
    await dynamoDb.put(params).promise();
    return {};
  } catch (error) {
    console.log(error)
    return {};
  }
};

export default handler;
