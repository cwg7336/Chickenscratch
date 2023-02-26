const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

const lib = require('./main');

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/api/test', (req, res) => {
    lib(req.body)
        .then(res.download('genPDFTest.pdf'));
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})
