import { NeuraMemoire } from './neurax-memoire.js';
import { NeuraAnalyseur } from './neurax-analyseur.js';
import { NeuraAssistant } from './neurax-assistant.js';

export class NeuraControleur {
    constructor() {
        this.memoire = new NeuraMemoire();
        this.analyseur = new NeuraAnalyseur();
        this.assistant = new NeuraAssistant();
    }

    envoyerMessage(message) {
        console.log("🧠 Neura-Contrôleur a reçu :", message);

        const analyse = this.analyseur.analyser(message);
        console.log("🧠 Résultat de l'analyse :", analyse);

        this.memoire.sauvegarderMessage({
            original: message,
            analyse: analyse
        });

        const reponse = this.assistant.genererReponse(analyse.motsTrouvés);

        this.repondre(reponse);
        this.parler(reponse); // <<<<< AJOUT : active la voix
    }

    repondre(texte) {
        const consoleDiv = document.getElementById('console');
        consoleDiv.innerHTML += `<p>${texte}</p>`;
    }

    parler(texte) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(texte);
            utterance.lang = 'fr-FR'; // français
            utterance.pitch = 1; // Ton de voix normal
            utterance.rate = 1; // Vitesse normale
            speechSynthesis.speak(utterance);
        } else {
            console.warn('Synthèse vocale non supportée sur ce navigateur.');
        }
    }
}

import { NeuraMemoire } from './neurax-memoire.js';
import { NeuraAnalyseur } from './neurax-analyseur.js';

export class NeuraControleur {
    constructor() {
        this.memoire = new NeuraMemoire();
        this.analyseur = new NeuraAnalyseur();
    }

    envoyerMessage(message) {
        console.log("🧠 Neura-Contrôleur a reçu :", message);

        // Étape 1 : Analyse du message
        const analyse = this.analyseur.analyser(message);
        console.log("🧠 Résultat de l'analyse :", analyse);

        // Étape 2 : Sauvegarde du message et de l'analyse
        this.memoire.sauvegarderMessage({
            original: message,
            analyse: analyse
        });

        // Étape 3 : Réponse simple
        this.repondre(`Analyse terminée : ${analyse.motsTrouvés.length} mots-clés trouvés.`);
    }

    repondre(texte) {
        const consoleDiv = document.getElementById('console');
        consoleDiv.innerHTML += `<p>${texte}</p>`;
    }
}
