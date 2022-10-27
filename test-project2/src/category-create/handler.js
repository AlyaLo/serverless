import AWS from "aws-sdk";
import { StatusCodes } from "http-status-codes";
import isUndefined from "lodash/isUndefined.js";
import { v4 as uuidv4 } from "uuid";
import invokeСreateWelcomePost from "../eventBridge/index.js";

const handler = async (event) => {
  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    const { categoryId, userName } = JSON.parse(event.body);
    if (isUndefined(categoryId) || isUndefined(userName)) {
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: StatusCodes.BAD_REQUEST,
        body: "invalid params",
      };
    }
    const params = {
      Item: {
        categoryId: categoryId,
        userName: userName,
      },
      TableName: process.env.CATEGORIES_TABLE,
    };
    await dynamoDb.put(params).promise();
    await invokeСreateWelcomePost({ categoryId, userName });
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
