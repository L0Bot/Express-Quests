const database = require("../../database.js");

const getMovies = (req, res) => {
  let sql = "SELECT * FROM movies";
  let sqlValues = [];

  if (req.query.color && req.query.max_duration) {
    sql += " WHERE color = ? AND duration <= ?";
    sqlValues.push(req.query.color, req.query.max_duration);
  } else if (req.query.color) {
    sql += " WHERE color = ?";
    sqlValues.push(req.query.color);
  } else if (req.query.max_duration) {
    sql += " WHERE duration <= ?";
    sqlValues.push(req.query.max_duration);
  }

  database
    .query(sql, sqlValues)
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
