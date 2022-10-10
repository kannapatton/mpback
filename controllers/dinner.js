const mysql = require('mysql2');
const pool = require('../sql/connections');
const { handleSQLError } = require('../sql/error');

const createDinner = (req, res) => {
	const { sunday, monday, tuesday, wednesday, thursday, friday, saturday } = req.body;
	let sql =
		'INSERT INTO dinner (sunday, monday, tuesday, wednesday, thursday, friday, saturday) VALUES (?, ?, ?, ?, ?, ?, ?)';
	sql = mysql.format(sql, [ sunday, monday, tuesday, wednesday, thursday, friday, saturday, req.params.id ]);

	pool.query(sql, (err, result) => {
		if (err) return handleSQLError(res, err);
		res.send(result);
	});
};

const getMenu = (req, res) => {
	pool.query('SELECT * FROM dinner', (err, results) => {
		if (err) return handleSQLError(res, err);
		return res.json(results);
	});
};

const deleteDinner = (req, res) => {
	let sql = 'DELETE FROM dinner WHERE iddinner = ?';
	sql = mysql.format(sql, [ req.params.iddinner]);

	pool.query(sql, (err, result) => {
		if (err) return handleSQLError(res, err);
		res.send(result);
	});
};

module.exports = {
	createDinner,
	getMenu,
	deleteDinner
};
