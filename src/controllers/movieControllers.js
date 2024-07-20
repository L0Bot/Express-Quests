const database = require("../../database.js");

const getMovies = (req, res) => {
  database
    .query("SELECT * FROM movies")
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getMovieById = (req, res) => {
  const movieId = parseInt(req.params.id);

  database
    .query(`SELECT * FROM movies WHERE id = ?`, movieId)
    .then(([movie]) => {
      if (movie.length === 0) {
        res.sendStatus(404);
      } else {
        res.json(movie);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getMovies,
  getMovieById,
};
