const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors())
app.use(express.json()); // Para a aplicação entender que os corpos de requisições estão em JSON 
app.use(routes);
//Abrindo server
app.listen(3333, function() {
    console.log("Server iniciado");
});