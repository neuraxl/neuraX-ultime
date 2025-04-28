export class NeuraAnalyseur {
    constructor() {
        this.motsClefs = ['bonjour', 'aide', 'problème', 'question', 'erreur', 'idée'];
    }

    analyser(message) {
        console.log("🧠 Neura-Analyseur traite :", message);
        const contenuAnalyse = {
            messageOriginal: message,
            motsTrouvés: [],
            estQuestion: message.includes('?')
        };

        this.motsClefs.forEach(mot => {
            if (message.toLowerCase().includes(mot)) {
                contenuAnalyse.motsTrouvés.push(mot);
            }
        });

        return contenuAnalyse;
    }
}
