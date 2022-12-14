import AWS from "aws-sdk";

async function invokeĐˇreateWelcomePost({ categoryId, userName }) {
  try {
    const eventBridge = new AWS.EventBridge({ region: process.env.AWS_PROVIDER_REGION, apiVersion: "2015-10-07" });
    console.log(process.env.EVENT_BUS_NAME);
    console.log;
    const response = await eventBridge
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
    console.log(response);
  } catch (error) {
    console.log(error)
    return {
      type: error.type,
      message: error.message,
    };
  }
}

export default invokeĐˇreateWelcomePost;
