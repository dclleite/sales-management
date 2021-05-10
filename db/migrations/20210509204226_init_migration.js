
exports.up = function(knex) {
  return knex.schema
    .createTable('clientes', function (table) {
      table.increments('id');
      table.string('nome').notNullable();
      table.string('cpfCnpj');
      table.text('endereco');
      table.string('telefone' );
    })
    .createTable('produtos', function (table) {
      table.increments('id');
      table.string('nome').notNullable();
      table.string('unidade', 10).notNullable();
      table.decimal('valor').notNullable();
      table.string('descricao', 1000);
    });

};

exports.down = function(knex) {
  return knex.schema
    .dropTable("produtos")
    .dropTable("clientes");
};
