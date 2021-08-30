const serverless = require("serverless-http");
const express = require("express");
const app = express();
const AWS = require('aws-sdk')
var eventbridge = new AWS.EventBridge({ apiVersion: '2015-10-07' });

app.post("/signup", async (req, res, next) => {
  const bodyData = JSON.parse(req.apiGateway.event.body);
  const params =
  {
    Entries: [ /* required */
      {
        Detail: JSON.stringify({
          email: bodyData.email,
          state: bodyData.state
        }),
        DetailType: 'UserSignup',
        EventBusName: 'default',
        Source: 'custom.myATMapp',
        Time: new Date(),
      },
      /* more items */
    ]
  };


  await eventbridge.putEvents(params).promise()

  return res.status(200).json({
    message: "Requested",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
