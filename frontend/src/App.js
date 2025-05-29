import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Box, Typography, Alert } from "@mui/material";

const App = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(null);

  const handleSendNotification = async () => {
    if (!message) {
      setResponse({ type: "error", text: "Message cannot be empty!" });
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/send-notification", { message });
      setResponse({ type: "success", text: res.data });
    } catch (err) {
      setResponse({ type: "error", text: "Failed to send notification." });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} p={3} boxShadow={3} borderRadius={2} bgcolor="white">
        <Typography variant="h5" align="center" gutterBottom>
          General Notification System
        </Typography>
        {response && <Alert severity={response.type}>{response.text}</Alert>}
        <TextField
          label="Notification Message"
          variant="outlined"
          fullWidth
          margin="normal"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSendNotification}
        >
          Send Notification
        </Button>
      </Box>
    </Container>
  );
};

export default App;