const express = require("express");

const app = express();

app.use(express.json());

const movieControllers = require("./controllers/movieControllers");
const userControllers = require("./controllers/userControllers");
const validateMovie = require("./middlewares/validateMovies");
const validateUser = require("./middlewares/validateUsers");

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.get("/api/users", userControllers.getUsers);
app.get("/api/users/:id", userControllers.getUserById);

app.post("/api/movies", validateMovie, movieControllers.postMovie);
app.post("/api/users", validateUser, userControllers.postUser);

app.put("/api/movies/:id", validateMovie, movieControllers.updateMovieById);
app.put("/api/users/:id", validateUser, userControllers.updateUserById);

module.exports = app;
