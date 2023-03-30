const express = require('express')
const axios = require('axios')
const path = require("path")
const app = express()

// On lui dit qu'on lui file du PUG
app.set("view engine", "pug");
// Dans le dossier views
app.set("views", path.join(__dirname, "views"));

// La ligne 11 permet de rendre un fichier HTML (bon ici PUG c'est genre du HTML rapide)
// Mais du coup tu peux faire ta requête, et dans le render, passer ton résultat en paramètre et le récup côté HTML / PUG
// La ligne 15 tu pourrais la mettre vers la ligne 28 et toc
/*app.get("/test", (req, res) => {
    res.render("index");
});*/

// Requête qui fonctionne vers l'API quand tu vas sur la route / donc localhost/ (tu pourrais mettre /test l.19 donc ça donnerait localhost/test après)
app.get("/", async (req, res) => {
    try {
        const response = await axios.get("https://en.wikipedia.org/api/rest_v1/page/random/summary")
        res.render("index", { searchs: response.data.title });
    }
    catch (err) {
        console.log(err)
    }
})

// Ça je sais pas à quoi ça sert
app.get('*', (req, res) => {
    res.status(500).json({ message: "error" })
})

// node app.js => localhost:3000 => ton server
// besoin d'installer node js https://nodejs.org/en et https://www.npmjs.com/package/npm
app.listen(3000)