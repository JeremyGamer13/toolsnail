const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
var path = require('path');
const app = express();
const port = 8080;
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.get('/', async function (req, res) {
    res.header("Content-Type", 'text/html');
    res.status(200)
    res.sendFile(path.join(__dirname, 'index.html'));
})
app.get('/snailaxToJson', async function (req, res) {
    res.header("Content-Type", 'text/html');
    res.status(200)
    res.sendFile(path.join(__dirname, 'tools/snailaxToJson.html'));
})
app.get('/jsonToSnailax', async function (req, res) {
    res.header("Content-Type", 'text/html');
    res.status(200)
    res.sendFile(path.join(__dirname, 'tools/jsonToSnailax.html'));
})
// images used on the site
app.get('/images/', async function (req, res) {
    if (!req.query.image) {
        res.header("Content-Type", 'application/json');
        res.status(400)
        res.json({ "error": "No image was specified in the image query parameter" })
        return
    }
    res.header("Content-Type", 'image/png');
    res.status(200)
    res.sendFile(path.join(__dirname, `images/${req.query.image}.png`));
})
// the syntax highlighting found on the converter pages uses prism.js so we need to be able to access it somehow
app.get('/siteStyling/prism/js', async function (req, res) {
    res.header("Content-Type", 'application/javascript');
    res.status(200)
    res.sendFile(path.join(__dirname, 'highlight/prism.js'));
})
app.get('/siteStyling/prism/css', async function (req, res) {
    res.header("Content-Type", 'text/css');
    res.status(200)
    res.sendFile(path.join(__dirname, 'highlight/prism.css'));
})
/*
/json was an initial test for sending json content on the site
app.get('/json', async function (req, res) {
    res.header("Content-Type", 'application/json');
    res.status(200)
    res.json({ "content": true })
})
*/
app.listen(port, () => console.log('Listening on port ' + port));