
exports.up = (knex) => {
  return knex.schema.createTable('table', (table) => {
      table.increments().primary();
      table.integer('number').notNullable();
      table.integer('capacity').notNullable();
  }).createTable('reservation', (table) => {
    table.increments().primary();
    table.timestamp('reservation_start').defaultTo(knex.fn.now());
    table.timestamp('reservation_end').defaultTo(knex.fn.now());
    table.integer('number_of_guests');
    table.integer('table_id').unsigned().references('table.id')
  })
};

exports.down = (knex) => {
  return knex.schema.dropTable('table').dropTable('reservation');
};
