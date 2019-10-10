
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('reservation').del()
    .then(function () {
      // Inserts seed entries
      return knex('reservation').insert([
        {id: 1, number_of_guests: 4, table_id: 3}
      ]);
    });
};
