exports.up = function (knex) {
  return knex.schema
    .createTable('client', function (table) {
      table.uuid('id').primary();
      table.string('name').notNullable();
      table.string('cpfCnpj');
      table.string('phone');
      table.string('email');
      table.string('street');
      table.string('streetNumber');
      table.string('neighborhood');
      table.string('cep');
      table.string('city');
      table.string('state');
    })
    .createTable('supplyer', function (table) {
      table.uuid('id').primary();
      table.string('name').notNullable();
      table.string('cpfCnpj');
      table.string('stateRegistration');
      table.string('phone');
      table.string('email');
      table.string('street');
      table.string('streetNumber');
      table.string('neighborhood');
      table.string('cep');
      table.string('city');
      table.string('state');
    })
    .createTable('product', function (table) {
      table.uuid('id').primary();
      table.string('name').notNullable();
      table.uuid('unitId').notNullable();
      table.decimal('price').notNullable();

      table.foreign('unitId').references('id').inTable('unit');
    })
    .createTable('productPrice', function (table) {
      table.uuid('id').primary();
      table.uuid('productId').notNullable();
      table.uuid('clientId').notNullable();
      table.decimal('price').notNullable();

      table.foreign('clientId').references('id').inTable('client');
      table.foreign('productId').references('id').inTable('product');
    })
    .createTable('order', function (table) {
      table.uuid('id').primary();
      table.uuid('clientId').notNullable();
      table.date('orderDate').notNullable();
      table.date('deliveryDate').notNullable();

      table.foreign('clientId').references('id').inTable('client');
    })
    .createTable('orderProduct', function (table) {
      table.uuid('id').primary();
      table.uuid('orderId').notNullable();
      table.uuid('productId').notNullable();
      table.integer('quantity').notNullable();

      table.foreign('orderId').references('id').inTable('order');
      table.foreign('productId').references('id').inTable('product');
    })
    ;

};

exports.down = function (knex) {
  return knex.schema
    .dropTable("client")
    .dropTable("supplyer")
    .dropTable("productPrice")
    .dropTable("order")
    .dropTable("orderProduct")
    .dropTable("product");
};
