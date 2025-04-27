const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const messages = document.getElementById('messages');
const loader = document.getElementById('loader');
const darkModeToggle = document.getElementById('darkModeToggle');
const modelSelector = document.getElementById('modelSelector');

// Dark mode toggle
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark');
}
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', document.body.classList.contains('dark') ? 'enabled' : 'disabled');
});

// Affichage d'un message
function appendMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}`;
  messageDiv.textContent = text;
  messages.appendChild(messageDiv);
  messages.scrollTop = messages.scrollHeight;
}

// Appel à l'API
async function askNeuraX(prompt) {
  loader.classList.remove('hidden');
  try {
    const response = await fetch('https://TON-BACKEND-URL/render/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt,
        model: modelSelector.value
      })
    });

    const data = await response.json();
    if (response.ok) {
      appendMessage(data.reply, 'bot');
    } else {
      appendMessage(`Erreur : ${data.error}`, 'bot');
    }
  } catch (error) {
    appendMessage(`Erreur réseau: ${error.message}`, 'bot');
  }
  loader.classList.add('hidden');
}

// Soumission formulaire
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const prompt = userInput.value.trim();
  if (!prompt) return;

  appendMessage(prompt, 'user');
  askNeuraX(prompt);
  userInput.value = '';
});


