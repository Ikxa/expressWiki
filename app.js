const express = require('express')
const axios = require('axios')
const path = require("path")
const app = express()

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/test", (req, res) => {
    res.render("index");
});

app.get("/", async (req, res) => {
    try {
        const params = {
            action: "query",
            list: "search",
            srsearch: "César",
            format: "json"
        }
        const response = await axios.get("https://fr.wikipedia.org/w/api.php", { params })
        res.json(response.data)
    }
    catch (err) {
        console.log(err)
    }
})

app.get('*', (req, res) => {
    res.status(500).json({ message: "error" })
})

app.listen(3000)