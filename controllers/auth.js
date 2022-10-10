const mysql = require('mysql2')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pool = require('../sql/connections')
const { handleSQLError } = require('../sql/error')

// for bcrypt
const saltRounds = 10

const signup = (req, res) => {
  const { username, password } = req.body
  let sql = "INSERT INTO users (username, password) VALUES (?, ?)"

  bcrypt.hash(password, saltRounds, function(err, hash) {
    sql = mysql.format(sql, [ username, hash ])
  
    pool.query(sql, (err, results) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') return res.status(409).send('Username is taken')
        return handleSQLError(res, err)
      }
      return res.send('Sign-up successful')
    })
  })
}


const  login = (req, res) => {
  const { username, password } = req.body;

  let sql = "SELECT * FROM users WHERE username = ?";
  sql = mysql.format(sql, [username]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    if (!results.length) return res.status(404).send("No matching users");

    const hash = results[0].password;
    bcrypt.compare(password, hash).then((result) => {
      if (!result) return res.status(400).send("Invalid password");

      const data = { ...results[0] };
      data.password = "REDACTED";

      const token = jwt.sign(data, process.env.JWT_SECRET, {expiresIn: "3h"})
                res.json({
                    msg: "Logged in " + username,
                    token
      });
    });
  });
};


module.exports = {
  signup,
  login
}