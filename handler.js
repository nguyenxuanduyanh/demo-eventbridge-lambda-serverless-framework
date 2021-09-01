const serverless = require("serverless-http");
const express = require("express");
const app = express();
const aws = require('aws-sdk')
var stepfunctions = new aws.StepFunctions()

app.post("/signup", async (req, res, next) => {
  const fullData = JSON.parse(req.apiGateway.event.body);
  const detailEventBr = { Detail: { state: fullData.state } }
  var params = {
    stateMachineArn: process.env.statemachine_arn,
    input: JSON.stringify({ ...fullData, ...detailEventBr })
  };

  await stepfunctions.startExecution(params).promise();
  return res.status(200).json({
    message: "Requested",
  });
})

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
