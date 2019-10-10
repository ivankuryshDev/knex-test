
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('table').del()
    .then(() => {
      // Inserts seed entries
      return knex('table').insert([
        {id: 1, capacity: 2},
        {id: 2, capacity: 2},
        {id: 3, capacity: 4},
        {id: 4, capacity: 4},
        {id: 5, capacity: 4},
        {id: 6, capacity: 4},
        {id: 7, capacity: 6},
        {id: 8, capacity: 6},
        {id: 9, capacity: 8},
        {id: 10, capacity: 16},
      ]);
    });
};
