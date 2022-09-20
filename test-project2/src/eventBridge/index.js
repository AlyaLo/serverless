import AWS from "aws-sdk";

async function invokeСreateWelcomePost({ categoryId, userName }) {
  try {
    const eventBridge = new AWS.EventBridge({ region: process.env.AWS_PROVIDER_REGION, apiVersion: "2015-10-07" });
    console.log(process.env.EVENT_BUS_NAME)
    console.log(process.env.EVENT_BUS_SERVICE_SOURCE)
    await eventBridge.putEvents(
      {
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
      },
      function (err, data) {
        if (err) console.log(err);
        else console.log(data + " succeessss");
      }
    );
  } catch (error) {
    return {
      type: error.type,
      message: error.message,
    };
  }
}

export default invokeСreateWelcomePost;
