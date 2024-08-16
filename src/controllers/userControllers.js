const database = require("../../database.js");

const getUsers = (req, res) => {
  const initialSql = "SELECT * FROM users";
  const where = [];

  if (req.query.language) {
    where.push({
      filter: "language",
      value: req.query.language,
      operator: "=",
    });
  }

  if (req.query.city) {
    where.push({
      filter: "city",
      value: req.query.city,
      operator: "=",
    });
  }

  const sql = where.reduce(
    (sql, { filter, operator }, index) =>
      `${sql} ${index === 0 ? "WHERE" : "AND"} ${filter} ${operator} ?`,
    initialSql
  );

  const values = where.map(({ value }) => value);

  database
    .query(sql, values)
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const postUser = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      if (result.affectedRows >= 1) {
        res.status(201);
      }
      res.send({
        id: result.insertId,
        howManyRowsAdded: result.affectedRows,
        warnings: result.warningStatus,
      });
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

const updateUserById = (req, res) => {
  const userIdToUpdate = req.params.id;
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      "UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ? WHERE id = ?",
      [firstname, lastname, email, city, language, userIdToUpdate]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else if (result.changedRows >= 1) {
        res.sendStatus(200);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const deleteUserById = (req, res) => {
  const userIdToDelete = parseInt(req.params.id);

  database
    .query("DELETE FROM users WHERE id = ?", [userIdToDelete])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else if (result.affectedRows >= 1) {
        res.sendStatus(200);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  getUsers,
  postUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
