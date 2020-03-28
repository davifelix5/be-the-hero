const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { errors } = require('celebrate')

//const connection = require('./database/connection');

const app = express();

app.use(cors())
app.use(express.json()); // Para a aplicação entender que os corpos de requisições estão em JSON 
app.use(routes);
app.use(errors());

/*
Rota pra tentar validar delete depois
app.get('/teste', async (req, res) => {
    const ong_id = req.headers.authorization
    let response = await connection('incidents').where('ong_id', ong_id).select('id');
    response = response.map(value => value.id)
    return res.json(response)
 })
*/

//Abrindo server
module.exports = app