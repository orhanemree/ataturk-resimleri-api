const Express = require("express");
const app = Express();
const images = require("./images.json");
const cors = require("cors");
const favicon = require("serve-favicon");

app.use(favicon(__dirname + "/public/favicon.ico"));
app.use(cors());
app.use(Express.static(__dirname+'/public'));

app.get("/", (req, res) => {
    res.status(200).json(images[Math.floor(Math.random() * images.length)]);
});

app.get("/resim", (req, res) => {
    res.status(200).send(`<img style="width: 50%;" src="/images/${images[Math.floor(Math.random() * images.length)].id}.png" alt="ataturk"></img><style>body{background-color: red; margin: 0px; background: #0e0e0e; display: grid; place-items: center;</style>`);
});

app.get("/:id", (req, res) => {
    if (images[(req.params.id)-1] === undefined){
        res.status(404).json({"404-not-found": `Bu id'ye sahip bir resim yok yanlızca 1-${images.length} arasında bir sayı girilebilir.`})
    }
    res.status(200).json(images[(req.params.id)-1]);
});

app.get("/:id/resim", (req, res) => {
    if (images[(req.params.id)-1] === undefined){
        res.status(404).json({"404-not-found": `Bu id'ye sahip bir resim yok yanlızca 1-${images.length} arasında bir sayı girilebilir.`})
    }
    res.status(200).send(`<img style="width: 50%;" src="/images/${req.params.id}.png" alt="ataturk"></img><style>body{background-color: red; margin: 0px; background: #0e0e0e; display: grid; place-items: center;</style>`);
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.warn(`App listening on http://localhost:${PORT}`);
});