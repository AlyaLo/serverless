import AWS from "aws-sdk";

const handler = async (event) => {
  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    const post = event.detail;
    await dynamoDb
      .put({
        Item: {
          creationDate: new Date().toISOString(),
          params: post.params,
        },
        TableName: process.env.POSTS_TABLE,
      })
      .promise();
    return {};
  } catch (error) {
    return {
      error: {
        message: error.message,
        type: error.type,
      },
    };
  }
};
