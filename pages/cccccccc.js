<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rotated Chat Bot</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- Chat bot container -->
  <div class="chatbot" id="chatbot">

    <div class="chat-content" id="chat-content">
      <div class="messages">
        <p class="bot-message">Hello! How can I help you today?</p>
      </div>
      <input type="text" id="user-input" placeholder="Type your message..." />
      <button onclick="sendMessage()">Send</button>
      <!-- WhatsApp Link -->
      <a
        href="https://wa.me/15551234567?text=Hi!%20I%20need%20some%20help."
        target="_blank"
        class="whatsapp-link"
      >
        Chat on WhatsApp
      </a>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>
