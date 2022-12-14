const express = require('express');
const app = express();
// const mysql = require('mysql2');
const cors = require('cors');
// const { access } = require('fs');
require('dotenv').config();
let port = process.env.PORT || 3009;
//middleware that parses info from front to backend
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// app.use(function(req, res, next) {
// 	res.header('Acess-Control-Allow-Methods', 'POST, GET, DELETE');
// 	res.header('Access-Control-Allow-Origin', 'https://mpfront.vercel.app'); // update to match the domain you will make the request from
// 	res.header('Access-Control-Allow-Credentials', true);
// 	res.header('Content-Type', 'application/json');
// 	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
// 	res.header('Access-Control-Allow-Methods', '*');
// 	next();
// });

const { logger } = require('./middleware/index.js');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const dinnerRouter = require('./routes/dinner');

app.use(logger);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/dinner', dinnerRouter);

app.listen(port, () => {
	console.log(`yay server is running on ${port}`);
});






// res.header( "Access-Control-Allow-Origin" );
// app.options("*", cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }));

// app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));

// app.get("/", (req, res) => {
//     res.set("Access-Control-Allow-Origin", 'http://localhost:3000');
//     res.send("Welcome to our server!");
//   });

//   const corsOptions ={
//     origin:'http://localhost:3000',
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200,
//  };
// access-control-allow-origin: 'http://localhost:3000';

//  app.use(cors(corsOptions)) // Use this after the variable declaration

// const db = mysql.createConnection({
// 	user: process.env.USER,
// 	host: process.env.HOST,
// 	password: process.env.PASSWORD,
// 	database: process.env.DATABASE
// });

// 


// "heroku-postbuild": "npm install --prefix client && npm run build --prefix client",





// app.post('/create', (req, res) => {
	// 	const sunday = req.body.sunday;
	// 	const monday = req.body.monday;
	// 	const tuesday = req.body.tuesday;
	// 	const wednesday = req.body.wednesday;
	// 	const thursday = req.body.thursday;
	// 	const friday = req.body.friday;
	// 	const saturday = req.body.saturday;
	
	// 	db.query(
	// 		'INSERT INTO dinner (sunday, monday, tuesday, wednesday, thursday, friday, saturday) VALUES (?,?,?,?,?,?,?)',
	// 		[ sunday, monday, tuesday, wednesday, thursday, friday, saturday ],
	// 		// callback function that represents what will happen after above statement is done
	// 		(err, result) => {
	// 			if (err) {
	// 				console.log(err);
	// 			} else {
	// 				res.send('Values Inserted');
	// 			}
	// 		}
	// 	);
	// });
	
	// app.get('/menu', (req, res) => {
	// 	db.query('SELECT * FROM dinner', (err, result) => {
	// 		if (err) {
	// 			console.log(err);
	// 		} else {
	// 			res.send(result);
	// 		}
	// 	});
	// });
	// // app.put('/update', (req, res) =>{
	// //     const id = req.body.id
	// //     const wage = req.body.wage;
	// //     db.query("UPDATE dinner SET monday = ? WHERE id = ?",
	// //     [monday, id],
	// //     (err, result) =>{
	// //         if (err) {
	// //             console.log(err)
	// //         } else{
	// //             res.send(result);
	// //         }
	// //     });
	// // });
	// app.post('/signup', (req, res) => {
	// 	const username = req.body.username;
	// 	const password = req.body.password;
	// 	db.query(
	// 		'INSERT INTO users (username, password) VALUES (?,?)',
	// 		[ username, password ],
	// 		// callback function that represents what will happen after above statement is done
	// 		(err, result) => {
	// 			if (err) {
	// 				console.log(err);
	// 			} else {
	// 				res.send('Values Inserted');
	// 			}
	// 		}
	// 	);
	// });
	// app.get('/login', (req, res) => {
	// 	const { username, password } = req.body;
	
	// 	let sql = 'SELECT * FROM users WHERE username = ?';
	// 	sql = mysql.format(sql, [ username ]);
	
	// 	pool.query(sql, (err, results) => {
	// 		if (err) return handleSQLError(res, err);
	// 		if (!results.length) return res.status(404).send('No matching users');
	
	// 		const hash = results[0].password;
	// 		bcrypt.compare(password, hash).then((result) => {
	// 			if (!result) return res.status(400).send('Invalid password');
	
	// 			const data = { ...results[0] };
	// 			data.password = 'REDACTED';
	
	// 			const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '3h' });
	// 			res.json({
	// 				msg: 'Logged in ' + username,
	// 				token
	// 			});
	// 		});
	// 	});
	// });
	// app.delete('/delete/:iddinner', (req, res) => {
	// 	const iddinner = req.params.iddinner;
	// 	db.query('DELETE FROM dinner WHERE iddinner = ?', iddinner, (err, result) => {
	// 		if (err) {
	// 			console.log(err);
	// 		} else {
	// 			res.send(result);
	// 		}
	// 	});
	// });
	