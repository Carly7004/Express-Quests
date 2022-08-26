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

// Post

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

module.exports = {
  getMovies,
  getMovieById,
  postMovie,
};
