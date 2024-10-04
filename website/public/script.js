const chatMessages = document.getElementById("chat-messages");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const popupButtons = document.getElementById("popup-buttons");

// Predefined responses for popup buttons
const options = {
  "product-info": "Here are the details about our products...",
  "order-tracking": "Please enter your order ID...",
  "customer-support": "Connecting you to the Assistant",
};

const userInputResponses = {
  hey: "Hello Buddy! How may I help you?",
  hello: "Hi there! How can I assist you today?",
};

// Function to handle sending user input as a message
function sendMessage() {
  const message = messageInput.value.trim().toLowerCase();
  if (message) {
    addMessage("user", messageInput.value); // Display the user's message
    messageInput.value = ""; // Clear the input field

    if (userInputResponses[message]) {
      addMessage("bot", userInputResponses[message]); // Bot responds to predefined messages
    } else {
      addMessage(
        "bot",
        "I'm sorry, I don't understand. Please select an option from above or rephrase your query."
      );
    }
  }
}

// Send message on button click
sendButton.addEventListener("click", sendMessage);

// Send message on pressing 'Enter'
messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});

// Function to handle adding messages to the chat
function addMessage(sender, message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");

  if (sender === "bot") {
    messageElement.classList.add("bot-message");
  } else {
    messageElement.classList.add("user-message");
  }

  messageElement.textContent = message;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the bottom
}

// Handle popup button clicks
popupButtons.addEventListener("click", (event) => {
  if (event.target.classList.contains("popup-button")) {
    const option = event.target.getAttribute("data-option");

    // Display the clicked button's text as a user message
    const userMessage = event.target.textContent.trim();
    addMessage("user", userMessage);

    // Add the corresponding bot response
    if (options[option]) {
      setTimeout(() => addMessage("bot", options[option]), 500); // Delay the bot response slightly
    }
  }
});

// Initial welcome message
addMessage("bot", "Welcome to BagBuzz! Please select an option:");
