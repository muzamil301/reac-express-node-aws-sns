const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const AWS = require("aws-sdk");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());

// AWS SNS Configuration
AWS.config.update({
  region: "eu-north-1", // Change to your AWS region
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const sns = new AWS.SNS();
const topicArn = process.env.SNS_TOPIC_ARN; // Topic ARN from AWS SNS
console.log('Topic arn', topicArn);
// Endpoint to send notifications
app.post("/api/send-notification", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).send("Message is required.");
  }

  const params = {
    Message: message, // Your notification message
    TopicArn: 'arn:aws:sns:eu-north-1:109804294746:test-topic', // SNS Topic ARN
  };

  console.log('params', params)

  try {
    const response = await sns.publish(params).promise();
    console.log("Notification sent successfully!", response);
    res.status(200).send("Notification sent!");
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).send("Failed to send notification.");
  }
});

// Start Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});