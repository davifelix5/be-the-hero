const express = require('express');
const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router()

//Rota para cadastrar ONGs
routes.post("/ongs", OngController.create);
//Rota para listar ongs
routes.get('/ongs', OngController.list);
//Rota para deletar ong
routes.delete('/ongs/:id', OngController.delete)

//Rota para cadastrar incidentes
routes.post('/incidents', IncidentController.create);
//Rota para listar incidentes
routes.get('/incidents', IncidentController.list);
//Rota para deletar um caso
routes.delete('/incidents/:id', IncidentController.delete);

//Rota para mostrar casos específicos
routes.get('/profile', ProfileController.index);

//Rota para login
routes.post('/sessions', SessionController.create);

module.exports = routes;