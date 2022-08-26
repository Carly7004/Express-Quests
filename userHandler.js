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

//POST and POST NEW USER ON THE DATABASE TABLE

const postUser = (req, res) => {
    const { firstname, lastname, email, city, language } = req.body;
    database.query(
      "INSERT INTO users (firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.location(`/api/users ${result.insertId}`).sendStatus(201)
      console.log(result)
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error saving the users')
    })
    res.send("Post route is working ✨ ");
  };

  // PUT and UPDATE DATABASE TABLE

  const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { firstname, lastname, email, city, language } = req.body;
  
    database
      .query(
        "UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ? where id = ?",
        [firstname, lastname, email, city, language, id]
      )
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.status(404).send("Not Found");
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error editing the user");
      });
  };


  //DELETE and DELETING FROM DATABASE TABLE

  const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
  
    database
      .query("DELETE FROM users WHERE id = ?", [id])
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.status(404).send("Not Found");
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error editing the user");
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
  postUser,
  updateUser,
  deleteUser
};
