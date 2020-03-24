const knex = require('knex');
const configuration = require('../../knexfile');

// pegar apenas a conexão de desenvolvimento de dentro do knexfile
const connection = knex(configuration.development);

module.exports = connection;
