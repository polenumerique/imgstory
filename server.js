const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
const imagesDir = path.join(__dirname, 'images');

// Servir les fichiers statiques
app.use('/images', express.static(imagesDir));
app.use(express.static(__dirname));

// Route pour récupérer des images aléatoires
app.get('/random-images', (req, res) => {
    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            return res.status(500).send('Erreur lors de la lecture du dossier images');
        }
        const jpgFiles = files.filter(file => path.extname(file).toLowerCase() === '.jpg');
        if (jpgFiles.length < 3) {
            return res.status(500).send('Pas assez d\'images dans le dossier');
        }

        // Sélectionner trois images aléatoires
        const randomImages = [];
        while (randomImages.length < 3) {
            const randomIndex = Math.floor(Math.random() * jpgFiles.length);
            const selectedImage = jpgFiles[randomIndex];
            if (!randomImages.includes(selectedImage)) {
                randomImages.push(selectedImage);
            }
        }

        res.json(randomImages);
    });
});

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution à l'adresse http://localhost:${port}`);
});
