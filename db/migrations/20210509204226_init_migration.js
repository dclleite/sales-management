exports.up = function (knex) {
  return knex.schema
    .createTable('client', function (table) {
      table.uuid('id').primary()
      table.string('name').notNullable()
      table.string('cpfCnpj')
      table.string('phone')
      table.string('email')
      table.string('street')
      table.string('streetNumber')
      table.string('neighborhood')
      table.string('cep')
      table.string('city')
      table.string('state')
    })
    .createTable('supplyer', function (table) {
      table.uuid('id').primary()
      table.string('name').notNullable()
      table.string('cpfCnpj')
      table.string('stateRegistration')
      table.string('phone')
      table.string('email')
      table.string('street')
      table.string('streetNumber')
      table.string('neighborhood')
      table.string('zipCode')
      table.string('city')
      table.string('state')
    })
    .createTable('product', function (table) {
      table.uuid('id').primary()
      table.string('name').notNullable()
      table.string('unit').notNullable()
      table.decimal('price').notNullable()
    })
    .createTable('productPrice', function (table) {
      table.uuid('id').primary()
      table.uuid('productId').notNullable()
      table.uuid('clientId').notNullable()
      table.decimal('price').notNullable()

      table.foreign('clientId').references('id').inTable('client')
      table.foreign('productId').references('id').inTable('product')
    })
    .createTable('order', function (table) {
      table.uuid('id').primary()
      table.uuid('clientId').notNullable()
      table.string('orderDate').notNullable()
      table.string('deliveryDate').notNullable()
      table.decimal('totalPrice').notNullable()
      table.boolean('completedOrder')

      table.foreign('clientId').references('id').inTable('client')
    })
    .createTable('orderProduct', function (table) {
      table.uuid('id').primary()
      table.uuid('orderId').notNullable()
      table.uuid('productId').notNullable()
      table.string('name').notNullable()
      table.integer('quantity').notNullable()
      table.string('unit').notNullable()
      table.decimal('price').notNullable()

      table.foreign('orderId').references('id').inTable('order')
      table.foreign('productId').references('id').inTable('product')
    })
    .createTable('dailyProduction', function (table) {
      table.uuid('id').primary()
      table.uuid('productId').notNullable()
      table.string('date').notNullable()
      table.integer('quantity').notNullable()

      table.foreign('productId').references('id').inTable('product')
    })
    .createTable('productStock', function (table) {
      table.uuid('id').primary()
      table.uuid('productId').notNullable()
      table.integer('quantity').notNullable()
      table.integer('reservedQuantity').notNullable()

      table.foreign('productId').references('id').inTable('product')
    })
}

exports.down = function (knex) {
  return knex.schema
    .dropTable('client')
    .dropTable('supplyer')
    .dropTable('productPrice')
    .dropTable('order')
    .dropTable('orderProduct')
    .dropTable('dailyProduction')
    .dropTable('productStock')
    .dropTable('product')
}
