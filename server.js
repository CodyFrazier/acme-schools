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

app.post('/api/:type', (request, response, next) => {
    const type = ['schools', 'students'].find( table => table === request.params.type) || '';
    if(type){
        if(request.body.schoolId === '-- none --' || request.body.schoolId === 'null'){
            request.body.schoolId = null;
        }
        db.createItem(type, request.body)
        .then(data => response.send(data))
        .catch(next);
    }
})

app.delete('/api/:type/:id', (request, response, next) => {
    const type = ['schools', 'students'].find( table => table === request.params.type) || '';
    if(type){
        db.deleteItem(type, request.params.id)
        .then(data => response.send(data))
        .catch(next);
    }
});

app.put('/api/:type/:id', (request, response, next) => {
    const type = ['schools', 'students'].find( table => table === request.params.type) || '';
    if(type){
        if(request.body.schoolId === '-- none --' || request.body.schoolId === 'null'){
            request.body.schoolId = null;
        }
        db.updateTable(type, request.params.id, request.body)
        .then(data => response.send(data))
        .catch(next);
    }
});

const port = process.env.PORT || 3000;

db.sync()
.then(() => {
    app.listen(port, () => {
        console.log(`listening on port ${ port }`)
    });
});