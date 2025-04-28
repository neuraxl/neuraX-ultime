export class NeuraMemoire {
    constructor() {
        this.messages = [];
        this.motsCleDynamiques = []; // <-- Nouveau : Liste de nouveaux mots détectés
    }

    sauvegarderMessage(message) {
        this.messages.push(message);
    }

    sauvegarderMotCle(mot) {
        if (!this.motsCleDynamiques.includes(mot)) {
            this.motsCleDynamiques.push(mot);
            console.log("🧠 Nouveau mot-clé appris :", mot);
        }
    }

    getMotsCleDynamiques() {
        return this.motsCleDynamiques;
    }
}
