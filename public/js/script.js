function toggleChatbox() {
    const chatbox = document.getElementById("chatbox");
    chatbox.style.display = chatbox.style.display === "block" ? "none" : "block";
  }
  
  document.getElementById("chatbot-icon").addEventListener("click", function () {
    toggleChatbox();
  });
  
  document.getElementById("chat-input").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleUserMessage();
    }
  });
  
  function handleUserMessage() {
    const chatInput = document.getElementById("chat-input");
    const message = chatInput.value.trim();
    if (!message) return;
  
    appendChatMessage("user", message);
    chatInput.value = "";
  
    appendTypingIndicator();
  
    fetch("/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        removeTypingIndicator();
        const botResponse = data.response || "I'm sorry, I didn't understand that.";
        appendChatMessage("bot", botResponse);
      })
      .catch((error) => {
        removeTypingIndicator();
        appendChatMessage("error", "Error: Unable to fetch response.");
      });
  }
  
  function appendChatMessage(sender, text) {
    const chatContent = document.getElementById("chat-content");
    const msgDiv = document.createElement("div");
  
    if (sender === "user") {
      msgDiv.classList.add("user-message");
    } else if (sender === "bot") {
      msgDiv.classList.add("bot-message");
    } else {
      msgDiv.classList.add("error-message");
    }
  
    msgDiv.textContent = text;
    chatContent.appendChild(msgDiv);
    chatContent.scrollTop = chatContent.scrollHeight;
  }
  
  function appendTypingIndicator() {
    const chatContent = document.getElementById("chat-content");
    const typingDiv = document.createElement("div");
    typingDiv.classList.add("bot-message", "typing");
    typingDiv.id = "typing-indicator";
    typingDiv.textContent = "Typing...";
    chatContent.appendChild(typingDiv);
    chatContent.scrollTop = chatContent.scrollHeight;
  }
  
  function removeTypingIndicator() {
    const typingDiv = document.getElementById("typing-indicator");
    if (typingDiv) typingDiv.remove();
  }
  