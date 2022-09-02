const movies = [
  {
    id: 1,
    title: "Citizen Kane",
    director: "Orson Wells",
    year: "1941",
    colors: false,
    duration: 120,
  },
  {
    id: 2,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: "1972",
    colors: true,
    duration: 180,
  },
  {
    id: 3,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    year: "1994",
    color: true,
    duration: 180,
  },
];

const database = require("./database");

const getMovies = (req, res) => {
  database
    .query("select * from movies")
    .then(([movie]) => {
      res.json(movie).send("movie data has been sent");
    })
    .catch((error) => {
      res.status(400).send("Not Found");
    });
};
// Get by id
const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);
  movies.find((movie) => movie.id === id);

  database
    .query(`select * from movies where id = ${id}`)
    .then(([movie]) => {
      if (!movie) return res.status(404).send("Not Found");
    })
    .catch((error) => {
      res.status(400).send("Not Found");
    });

  // database.query(`select * from movies where id = ${id}`)
  // .then(([movie]) => {
  //   if (movie !== null) {
  //     res.json(movie);
  //   } else {
  //     res.status(404).send("Not Found");
  //   }
  // }).catch((error) => {
  //   res.status(400).send('Not Found')
  // })

  // if (movie != null) {
  //   res.json(movie);
  // } else {
  //   res.status(404).send("Not Found");
  // }
};

// Get by sorting #1 method

// const getMoviesByFilter = (req, res) => {
//   let sql = "select * from movies";
//   const sqlValues = [];

//   if (req.query.color != null) {
//     sql += " where color = ?";
//     sqlValues.push(req.query.color);
  
//     if (req.query.max_duration != null) {
//       sql += " and duration <= ?";
//       sqlValues.push(req.query.max_duration);
//     }
//   } else if (req.query.max_duration != null) {
//     sql += " where duration <= ?";
//     sqlValues.push(req.query.max_duration);
//   }

//   database
//     .query(sql, sqlValues)
//     .then(([movies]) => {
//       res.json(movies);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send("Error retrieving data from database");
//     });
// };

// Get by filter #2 mothod

const getMoviesByFilter = (req, res) => {
  const initialSql = "select * from movies";
  const where = [];

  if (req.query.color != null) {
    where.push({
      column: "color",
      value: req.query.color,
      operator: "=",
    });
  }
  if (req.query.max_duration != null) {
    where.push({
      column: "duration",
      value: req.query.max_duration,
      operator: "<=",
    });
  }

  database
    .query(
      where.reduce(
        (sql, { column, operator }, index) =>
          `${sql} ${index === 0 ? "where" : "and"} ${column} ${operator} ?`,
        initialSql
      ),
      where.map(({ value }) => value)
    )
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

// Post and INSERT NEW ITEM ON THE DATABASE TABLE

const postMovie = (req, res) => {
  const { title, director, year, color, duration } = req.body;
  database.query(
    "INSERT INTO movies (title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
    [title, director, year, color, duration]
  )
  .then(([result]) => {
    res.location(`/api/movies ${result.insertId}`).sendStatus(201)
    console.log(result)
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error saving the movies')
  })
  res.send("Post route is working ✨ ");
};


// Put and UPDATE DATABASE TABLE

const updateMovie = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, director, year, color, duration } = req.body;

  database
    .query(
      "UPDATE movies SET title = ?, director = ?, year = ?, color = ?, duration = ? where id = ?",
      [title, director, year, color, duration, id]
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
      res.status(500).send("Error editing the movie");
    });
};


  //DELETE and DELETING FROM DATABASE TABLE

  const deleteMovie = (req, res) => {
    const id = parseInt(req.params.id);
  
    database
      .query("DELETE FROM movies WHERE id = ?", [id])
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

module.exports = {
  getMovies,
  getMovieById,
  postMovie,
  updateMovie,
  deleteMovie,
  getMoviesByFilter
};
