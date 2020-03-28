const express = require('express');

const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const OngValidators = require('./validators/OngValidators');
const IncidentValidators = require('./validators/IncidentValidators');

const routes = express.Router()

//Rota para cadastrar ONGs
routes.post("/ongs", OngValidators.createValidator, OngController.create);
//Rota para listar ongs
routes.get('/ongs', OngController.list);
//Rota para deletar ong
routes.delete('/ongs/:id', OngController.delete)

//Rota para cadastrar incidentes
routes.post('/incidents', IncidentValidators.createValidator, IncidentController.create);
//Rota para listar incidentes
routes.get('/incidents', IncidentValidators.listValidator, IncidentController.list);
//Rota para deletar um caso
routes.delete('/incidents/:id', IncidentValidators.deleteValidator, IncidentController.delete);
//Rota para mostrar casos específicos
routes.get('/profile', IncidentValidators.profileValidator, ProfileController.index);

//Rota para login
routes.post('/sessions', OngValidators.loginValidator, SessionController.create);

module.exports = routes;