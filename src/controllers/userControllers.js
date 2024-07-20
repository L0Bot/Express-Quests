const database = require("../../database.js");

const getUsers = (req, res) => {
  database
    .query("SELECT * FROM users")
    .then(([users]) => {
      res.json(users);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const getUserById = (req, res) => {
  const userId = parseInt(req.params.id);

  database
    .query(`SELECT * FROM users WHERE id = ?`, userId)
    .then(([user]) => {
      if (user.length === 0) {
        res.sendStatus(404);
      } else {
        res.json(user);
      }
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  getUsers,
  getUserById,
};
