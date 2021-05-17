
exports.up = function(knex) {
  return knex.schema
    .createTable('clientes', function (table) {
      table.increments('id').primary();
      table.string('nome').notNullable();
      table.string('cpfCnpj');
      table.text('endereco');
      table.string('telefone' );
    })
    .createTable('produtos', function (table) {
      table.increments('id').primary();
      table.string('nome').notNullable();
      table.string('unidade', 10).notNullable();
      table.decimal('valor').notNullable();
      table.string('descricao', 1000);
    })
    .createTable('precoProduto', function (table) {
      table.increments('id').primary();
      table.integer('clienteId').notNullable();
      table.integer('produtoId').notNullable();
      table.decimal('valor').notNullable();

      table.foreign('clienteId').references('id').inTable('clientes');
      table.foreign('produtoId').references('id').inTable('produtos');
    });

};

exports.down = function(knex) {
  return knex.schema
    .dropTable("precoProduto")
    .dropTable("produtos")
    .dropTable("clientes");
};
