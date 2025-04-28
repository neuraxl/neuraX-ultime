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
