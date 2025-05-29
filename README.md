  # React + node + aws + SNS

## Overview

This project is a **full-stack application** with the backend built using **Express.js** and the frontend built using **React.js**. The backend integrates with **AWS SNS (Simple Notification Service)** to send notifications, while the frontend provides a user interface to trigger these notifications.

The purpose of this project is to demonstrate a typical full-stack implementation where a frontend app communicates with a backend server to interact with cloud services like AWS SNS.

---

## Folder Structure

```
repository/
├── backend/     # Node.js Express backend for handling SNS notifications
├── frontend/    # React.js frontend for user interaction
└── README.md    # Instructions to set up and run the project
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or later)
- An **AWS account** with access to **SNS (Simple Notification Service)**
- AWS IAM credentials with permission to interact with SNS

---

## Setup Instructions

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd repository
```

---

### Step 2: Configure Environment Variables

Create a `.env` file in the project root directory.

Add the following variables:

```env
AWS_ACCESS_KEY_ID=<your-access-key-id>
AWS_SECRET_ACCESS_KEY=<your-secret-access-key>
SNS_TOPIC_ARN=arn:aws:sns:<region>:<account-id>:<topic-name>
PORT=5000
REACT_APP_API_URL=http://localhost:5000
```

Replace placeholders:

- `<your-access-key-id>`: Your AWS Access Key ID
- `<your-secret-access-key>`: Your AWS Secret Access Key
- `<region>`: The AWS region (e.g., `eu-north-1`)
- `<account-id>`: Your AWS account ID
- `<topic-name>`: The name of your SNS topic

**Example `.env` file:**

```env
AWS_ACCESS_KEY_ID=EXAMPLEACCESSKEY
AWS_SECRET_ACCESS_KEY=EXAMPLESECRET
SNS_TOPIC_ARN=arn:aws:sns:eu-north-1:123456789012:my-topic
PORT=5000
REACT_APP_API_URL=http://localhost:5000
```

---

### Step 3: Install Dependencies

#### Backend:

```bash
cd backend
npm install
```

#### Frontend:

```bash
cd ../frontend
npm install
```

---

### Step 4: Run the Application

#### Start Backend:

```bash
cd backend
npm start
```

The backend runs at: `http://localhost:5000`

#### Start Frontend:

```bash
cd ../frontend
npm start
```

The frontend runs at: `http://localhost:3000`

---

## AWS SNS Setup

### 1. Log in to AWS Management Console
- Navigate to the **SNS Console**

### 2. Create a Topic
- Click on **Create topic**
- Choose **Standard** topic type
- Set a meaningful **Topic Name**
- Click **Create topic**

### 3. Get Topic ARN
- After creation, copy the **Topic ARN**, which looks like:

```
arn:aws:sns:<region>:<account-id>:<topic-name>
```

### 4. Assign IAM Permissions

Ensure your IAM credentials have `sns:Publish` permission for the topic. Use a policy like:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "sns:Publish",
      "Resource": "arn:aws:sns:<region>:<account-id>:<topic-name>"
    }
  ]
}
```

---

## Testing the Application

1. Start backend:  
   `cd backend && npm start`

2. Start frontend:  
   `cd frontend && npm start`

3. Open:  
   `http://localhost:3000` in your browser

4. Input a message and click **Send Notification**

5. Backend processes request and publishes to SNS topic

6. Verify:
   - Check **Messages Published** metric in SNS Console
   - Confirm notification received by subscribers (e.g., Email or SMS)

---

## Environment Variables Summary

### Backend `.env`

| Variable                 | Description                                         |
|--------------------------|-----------------------------------------------------|
| `AWS_ACCESS_KEY_ID`      | AWS access key for SNS access                       |
| `AWS_SECRET_ACCESS_KEY`  | AWS secret key for SNS access                       |
| `SNS_TOPIC_ARN`          | ARN of the SNS topic to publish notifications       |
| `PORT`                   | Backend server port (default: 5000)                 |

### Frontend `.env`

| Variable              | Description                                         |
|-----------------------|-----------------------------------------------------|
| `REACT_APP_API_URL`   | URL for frontend to communicate with backend        |

---

## Notes

### Common Issues

- **InvalidParameter: Invalid parameter: TopicArn**  
  Check if `SNS_TOPIC_ARN` matches actual topic ARN.

- **ExpiredToken Error**  
  Verify your AWS credentials are valid.

- **AccessDenied (sns:Publish)**  
  Ensure IAM policy includes permission to publish to the topic.

---

## Future Enhancements

- Add rate-limiting to the backend
- Improve backend error logging
- Allow frontend to select from multiple SNS topics

---

## Contact

For bugs or suggestions, please [Email](muzamil301@gmail.com).  
Thank you for using this project! 🚀
