document.addEventListener('DOMContentLoaded', () => {
  const chatForm = document.getElementById('chat-form');
  const userInput = document.getElementById('user-input');
  const chatLog = document.getElementById('chat-log');

  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (message === "") return;

    appendMessage('user', message);
    userInput.value = '';

    appendMessage('bot', 'NeuraX réfléchit...');

    try {
      const response = await fetch('https://api.example.com/chat', { // Remplacer par votre API réelle
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer VOTRE_CLE_API' // Jamais exposer en prod
        },
        body: JSON.stringify({ prompt: message })
      });

      if (!response.ok) {
        throw new Error('Erreur réseau');
      }

      const data = await response.json();
      const botReply = data.reply || "Je n'ai pas compris, peux-tu reformuler ?";
      updateLastBotMessage(botReply);

    } catch (error) {
      console.error(error);
      updateLastBotMessage("Erreur lors de la communication avec NeuraX.");
    }
  });

  function appendMessage(sender, text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageElement.textContent = text;
    chatLog.appendChild(messageElement);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  function updateLastBotMessage(newText) {
    const botMessages = document.querySelectorAll('.bot-message');
    if (botMessages.length > 0) {
      botMessages[botMessages.length - 1].textContent = newText;
    }
  }
});

