const express = require('express');
const path = require('path');
const db = require('./db.js');

const app = express();
app.use(express.json());

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (request, response, next) => {
    response.sendFile(path.join(__dirname, 'index.html'))
});

app.get('/api/:type', (request, response, next) => {
    db.readTable(request.params.type)
    .then(data => response.send(data))
    .catch(next);
});

const port = process.env.PORT || 3000;

db.sync()
.then(() => {
    app.listen(port, () => {
        console.log(`listening on port ${ port }`)
    });
});