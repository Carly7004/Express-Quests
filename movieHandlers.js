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
  database.query('select * from movies')
  .then(([movie]) => {
    res.json(movie).send('movie data has been sent')
  }).catch((error) => {
    res.status(400).send('Not Found')
  })
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  // database.query(`select * from movies where id = ${id}`)
  // .then(([movie]) => {
  //   res.json(movie).send('movie data has been sent')
  // }).catch((error) => {
  //   res.status(400).send('Not Found')
  // })

  const movieid = movies.find((movie) => movie.id === id);

  database.query('select * from movies where id = ?', [id])
  .then(([movie]) => {
    if (movie !== null) {
      res.json(movie);
    } else {
      res.status(404).send("Not Found");
    }
  }).catch((error) => {
    res.status(400).send('Not Found')
  })

  // if (movie != null) {
  //   res.json(movie);
  // } else {
  //   res.status(404).send("Not Found");
  // }
};

module.exports = {
  getMovies,
  getMovieById,
};
