const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./queries');
const port = 3000;
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
});

// app.get('/todos', db.getTodos);
app.get('/todos/:id', db.getTodoById);
app.get('/todos2', db.getTodosV2);

app.post('/todos', db.createTodo);
app.put('/todos/:id', db.updateTodo);
app.delete('/todos/:id', db.deleteTodo);




app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})