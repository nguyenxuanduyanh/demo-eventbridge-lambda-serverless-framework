var aws = require('aws-sdk');
var eventbridge = new aws.EventBridge({
  apiVersion: '2015-10-07',
  // endpoint: 'http://127.0.0.1:4010',
});
module.exports.handler = async (event, context, callback) => {
  const bodyData = JSON.parse(event);
  const params =
  {
    Entries: [ /* required */
      {
        Detail: JSON.stringify({
          email: bodyData.email,
          state: bodyData.state
        }),
        DetailType: 'UserSignup',
        EventBusName: 'signup',
        Source: 'custom.myATMapp',
        Time: new Date(),
      },
      /* more items */
    ]
  };


  await eventbridge.putEvents(params).promise()
  return;
}