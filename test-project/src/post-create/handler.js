import AWS from "aws-sdk";

const handler = async (event) => {
  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    const { categoryId, userName, text, ...props } = JSON.parse(event.body);
    await dynamoDb
      .put(
        {
          Item: {
            categoryId: categoryId,
            creationDate: new Date().toISOString(),
            userName: userName,
            text: text,
            ...props,
          },
          TableName: process.env.POSTS_TABLE,
        },
        function (err, data) {
          if (err) console.log(err);
          else console.log(data);
        }
      )
      .promise();
    return {
      statusCode: 201,
      isBase64Encoded: false,
      body: "{\n  \"TotalCodeSize\": 104330022,}"
    };
  } catch (error) {
    return {
      error: {
        message: error.message,
        type: error.type,
      },
    };
  }
};

export default handler;
