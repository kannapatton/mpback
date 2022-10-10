const mysql = require('mysql2')
const pool = require('../sql/connections')
const { handleSQLError } = require('../sql/error')


const createUser = (req, res) => {
    const { username, password } = req.body;
    let sql = "INSERT INTO users (username, password) VALUES (?, ?, ?)";
    sql = mysql.format(sql, [username, password]);
  
    pool.query(sql, (err, results) => {
      if (err) return handleSQLError(res, err);
      return res.json({ newId: results.insertId });
    });
  };

  module.exports = {
    createUser
  }