exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("addresses")
    .del()
    .then(() => {
      return knex("users").del();
    })
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([{ username: "admin", firstname: "Elaheh" }]);
    })
    .then((userId) => {
      console.log(userId);
      return knex("addresses").insert([
        { user_id: userId[0], street: "Ålandsgade" },
      ]);
    });
};
