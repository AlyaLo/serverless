import AWS from "aws-sdk";
import { StatusCodes } from "http-status-codes";
import { v4 as uuidv4 } from "uuid";

const handler = async (event) => {
  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    const { categoryId, userName, text } = JSON.parse(event.body);
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
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: StatusCodes.CREATED,
      body: JSON.stringify(params.Item),
    };
  } catch (error) {
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: StatusCodes.BAD_REQUEST,
      body: "",
    };
  }
};

export default handler;
