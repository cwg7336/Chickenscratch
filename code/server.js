const express = require('express');
const app = express();
const port = 8080;

const lib = require('./main');

app.use(express.static('public'));

app.get('/api/test', (req, res) => {
    lib()
        .then(res.download('genPDFTest.pdf'));
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})
