
exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('reservation').del()
    .then(() => {
      // Inserts seed entries
      return knex('reservation').insert([
        {id: 1, number_of_guests: 4, table_id: 3}
      ]);
    });
};
