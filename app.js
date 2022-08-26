const express = require("express");
require('dotenv').config();

const app = express();

const port = process.env.APP_PORT || 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});


const user = require("./user");


app.get('/api/user', (req, res) => {
  res.status(200).json(user);
})

app.get("/api/user/:id", (req, res) => {
  const findUser = user.find((e) => e.id === parseInt(req.params.id));
  if (!findUser) return res.status(400).send("Not Found");
  res.json(findUser).status(200);
});

