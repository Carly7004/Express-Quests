const users = [
  {
    id: 1,
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@example.com",
    city: "Paris",
    language: "English",
  },
];

const database = require("./database");

const getUsers = (req, res) => {
  database
    .query("select * from users")
    .then(([user]) => {
      res.json(user).status(200);
    })
    .catch((error) => {
      res.status(400).send("Not Found");
    });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
//   users.find((user) => user.id === id);
  database
    .query(`select * from users where id = ${id}`)
    .then(([user]) => {
      if (!user) return res.status(400).send("Not Found");
    })
    .catch((error) => {
      res.status(500).send("Not Found");
    });
};

// const getUserid = (req, res) => {
//   database.query(`select * from users where id = ${id}`);
//   const findUser = users.find((e) => e.id === parseInt(req.params.id));
//   if (!findUser) return res.status(400).send("Not Found");
//   res.json(findUser).status(200);
// };

module.exports = {
  getUserById,
  getUsers,
};
