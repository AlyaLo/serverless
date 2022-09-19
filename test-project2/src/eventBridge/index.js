import AWS from "aws-sdk";

async function invokeСreateWelcomePost({ categoryId, userName }) {
  try {
    const eventBridge = new AWS.EventBridge({ region: process.env.AWS_PROVIDER_REGION });
    await eventBridge
      .putEvents({
        Entries: [
          {
            Detail: JSON.stringify({
              categoryId,
              userName,
              text: `Welcome to ${categoryId} category!`,
            }),
            DetailType: "createWelcomePost",
            EventBusName: process.env.EVENT_BUS_NAME,
            Source: process.env.EVENT_BUS_SERVICE_SOURCE,
          },
        ],
      })
      .promise();
  } catch (error) {
    return {
      type: error.type,
      message: error.message,
    };
  }
}

export default invokeСreateWelcomePost;
