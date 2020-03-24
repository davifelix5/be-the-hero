
exports.up = function(knex) {
  return knex.schema.createTable('ongs', function(table) {
      table.string('id').primary(); // esse ID é um texto, pois é com ele que a ONG irá logar
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('whatsapp').notNullable();
      table.string('city').notNullable();
      table.string('uf', 2).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};
