async function askAI() {
    let userInput = document.getElementById("userInput").value;
    let responseText = "Je réfléchis...";

    let response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: { "Authorization": "Bearer YOUR_API_KEY", "Content-Type": "application/json" },
        body: JSON.stringify({ model: "gpt-4", prompt: userInput })
    });

    let data = await response.json();
    responseText = data.choices[0].text;

    document.getElementById("response").innerText = responseText;
}

// Ajout de la reconnaissance vocale
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'fr-FR';

recognition.onresult = (event) => {
    document.getElementById("userInput").value = event.results[0][0].transcript;
    askAI();
};

document.getElementById("voiceButton").addEventListener("click", () => {
    recognition.start();
});
