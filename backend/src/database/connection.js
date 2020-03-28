const knex = require('knex');
const configuration = require('../../knexfile');

const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development

// pegar apenas a conexão de desenvolvimento de dentro do knexfile
const connection = knex(config);

module.exports = connection;
