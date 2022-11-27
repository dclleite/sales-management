exports.up = async function (knex) {
  await knex.schema.alterTable('order', function (table) {
    table.integer('orderNumber').unique()
  })

  const order_data = await knex('order').select('*')

  order_data.forEach(async (order, indice) => {
    await knex('order')
      .where('id', order.id)
      .update('orderNumber', indice + 1)
  })
}

exports.down = function (knex) {
  return knex.schema.table('order', function (table) {
    table.dropColumn('orderNumber')
  })
}
