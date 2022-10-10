const jwt = require('jsonwebtoken');

const logger = (req, res, next) => {
	console.log('Logging route:', req.path, new Date().toISOString());
	next();
};

const checkJwt = (req, res, next) => {
	let signedToken;
	let header = req.get('Authorization');

	if (header) {
		let parts = header.split(' ');
		signedToken = parts[1];
	}

	if (signedToken) {
		jwt.verify(signedToken, process.env.JWT_SECRET, (err, decoded) => {
			if (err) {
				res.sendStatus(400);
			} else {
				let token = jwt.verify(signedToken, process.env.JWT_SECRET);
				req.token = token;

				next();
			}
		});
	} else {
		res.sendStatus(400);
	}
};

module.exports = {
	checkJwt,
	logger
};
