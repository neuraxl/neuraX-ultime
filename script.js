document.addEventListener('DOMContentLoaded', () => {
  const chatForm = document.getElementById('chat-form');
  const userInput = document.getElementById('user-input');
  const chatLog = document.getElementById('chat-log');
  const darkModeToggle = document.getElementById('dark-mode-toggle');

  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });

  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (message === "") return;

    appendMessage('user', message);
    userInput.value = '';

    const loader = appendLoader();

    try {
      const response = await fetch('https://api.example.com/chat', { // À remplacer par ton URL API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer VOTRE_CLE_API' // À sécuriser
        },
        body: JSON.stringify({ prompt: message })
      });

      if (!response.ok) throw new Error('Erreur réseau');

      const data = await response.json();
      const botReply = data.reply || "Je n'ai pas compris, peux-tu reformuler ?";
      
      loader.remove();
      appendMessage('bot', botReply);

    } catch (error) {
      console.error(error);
      loader.remove();
      appendMessage('bot', "Erreur de communication avec NeuraX.");
    }
  });

  function appendMessage(sender, text) {
    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('message', sender);

    const avatar = document.createElement('img');
    avatar.classList.add('avatar');
    avatar.src = sender === 'user' ? 'user-avatar.png' : 'bot-avatar.png';
    avatar.alt = sender === 'user' ? 'Utilisateur' : 'NeuraX';

    const messageText = document.createElement('div');
    messageText.classList.add('message-text');
    messageText.textContent = text;

    messageWrapper.appendChild(avatar);
    messageWrapper.appendChild(messageText);
    chatLog.appendChild(messageWrapper);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  function appendLoader() {
    const loaderWrapper = document.createElement('div');
    loaderWrapper.classList.add('message', 'bot');

    const avatar = document.createElement('img');
    avatar.classList.add('avatar');
    avatar.src = 'bot-avatar.png';
    avatar.alt = 'NeuraX';

    const loader = document.createElement('div');
    loader.classList.add('loader');

    loaderWrapper.appendChild(avatar);
    loaderWrapper.appendChild(loader);
    chatLog.appendChild(loaderWrapper);
    chatLog.scrollTop = chatLog.scrollHeight;

    return loaderWrapper;
  }
});


