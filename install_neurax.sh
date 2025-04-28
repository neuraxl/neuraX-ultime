#!/bin/bash

echo "🚀 Lancement de l'installation de NeuraX-Ultime..."

# Créer la structure du projet
mkdir -p neuraX-ultime/{js,css,assets}
cd neuraX-ultime

# Télécharger D3.js pour la visualisation
curl -o js/d3.min.js https://d3js.org/d3.v7.min.js

# Créer les fichiers de base
echo "🌟 Création des fichiers de base..."

cat > index.html <<EOF
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>NeuraX-Ultime</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <h1>🤖 Bienvenue dans NeuraX-Ultime</h1>
    <div id="brain-map"></div>

    <script type="module" src="js/neurax-controleur.js"></script>
</body>
</html>
EOF

cat > css/style.css <<EOF
body {
    font-family: Arial, sans-serif;
    background-color: #f0f2f5;
    text-align: center;
}
#brain-map {
    margin: 30px auto;
    width: 80%;
    height: 500px;
}
EOF

cat > js/neurax-memoire.js <<EOF
export class NeuraMemoire {
    constructor() {
        this.messages = JSON.parse(localStorage.getItem('neurax_messages')) || [];
        this.motsCleDynamiques = JSON.parse(localStorage.getItem('neurax_mots_cle_dynamiques')) || [];
    }
    sauvegarderMessage(message) {
        this.messages.push(message);
        this._sauvegarderLocal();
    }
    sauvegarderMotCle(mot) {
        if (!this.motsCleDynamiques.includes(mot)) {
            this.motsCleDynamiques.push(mot);
            this._sauvegarderLocal();
        }
    }
    _sauvegarderLocal() {
        localStorage.setItem('neurax_messages', JSON.stringify(this.messages));
        localStorage.setItem('neurax_mots_cle_dynamiques', JSON.stringify(this.motsCleDynamiques));
    }
}
EOF

cat > js/neurax-reflexion.js <<EOF
export class NeuraReflexion {
    reflechir(message) {
        if (message.length > 50) {
            return "Message long détecté, nécessite réflexion approfondie.";
        }
        return "Message simple traité rapidement.";
    }
}
EOF

cat > js/neurax-emotion.js <<EOF
export class NeuraEmotion {
    analyserEmotion(message) {
        const joyeux = ['heureux', 'content', 'satisfait', 'génial'];
        const triste = ['triste', 'déçu', 'fatigué', 'mal'];

        const mots = message.toLowerCase().split(/\\s+/);

        if (mots.some(m => joyeux.includes(m))) return "joie";
        if (mots.some(m => triste.includes(m))) return "tristesse";
        return "neutre";
    }
}
EOF

cat > js/neurax-visualisation.js <<EOF
import * as d3 from './d3.min.js';

export function dessinerCarteNeurale(neurones) {
    const width = 800;
    const height = 600;

    const svg = d3.select("#brain-map")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const simulation = d3.forceSimulation(neurones)
        .force("charge", d3.forceManyBody().strength(-50))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide().radius(40));

    const node = svg.selectAll("circle")
        .data(neurones)
        .enter()
        .append("circle")
        .attr("r", 30)
        .attr("fill", "skyblue")
        .call(drag(simulation));

    const label = svg.selectAll("text")
        .data(neurones)
        .enter()
        .append("text")
        .text(d => d.nom)
        .attr("text-anchor", "middle")
        .attr("dy", 4);

    simulation.on("tick", () => {
        node.attr("cx", d => d.x)
            .attr("cy", d => d.y);
        label.attr("x", d => d.x)
             .attr("y", d => d.y);
    });

    function drag(simulation) {
        return d3.drag()
            .on("start", (event, d) => {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            })
            .on("drag", (event, d) => {
                d.fx = event.x;
                d.fy = event.y;
            })
            .on("end", (event, d) => {
                if (!event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            });
    }
}
EOF

cat > js/neurax-controleur.js <<EOF
import { NeuraMemoire } from './neurax-memoire.js';
import { NeuraReflexion } from './neurax-reflexion.js';
import { NeuraEmotion } from './neurax-emotion.js';
import { dessinerCarteNeurale } from './neurax-visualisation.js';

const memoire = new NeuraMemoire();
const reflexion = new NeuraReflexion();
const emotion = new NeuraEmotion();

const neurones = [
    { nom: "Assistant" },
    { nom: "Mémoire" },
    { nom: "Analyseur" },
    { nom: "Réflexion" },
    { nom: "Émotion" }
];

dessinerCarteNeurale(neurones);

// Exemple de fonctionnement
memoire.sauvegarderMessage("Bonjour je suis heureux !");
memoire.sauvegarderMotCle("heureux");

console.log(reflexion.reflechir("Bonjour je suis heureux d'être ici."));
console.log(emotion.analyserEmotion("Je suis tellement content aujourd'hui!"));
EOF

echo "✅ Installation terminée !"
echo "👉 Ouvre le fichier 'index.html' dans ton navigateur pour tester NeuraX-Ultime !"
