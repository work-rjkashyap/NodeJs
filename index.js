var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'test',
});

connection.connect();

app.post('/', function (req, res) {
	// const username = req.body.username

	const { username, password } = req.body;

	console.log('req.body', req.body);

	connection.query(`SELECT * FROM login `, function (error, results, fields) {
		if (error) {
			res.json({ code: 502, msg: 'server Error' });
		} else {
			if (results.length > 0) {
				res.json({
					code: 200,
					data: results,
					msg: 'Data fatch successfully',
				});
			} else {
				res.json({ code: 404, msg: 'Data not found' });
			}
		}
	});

	// connection.end();
});

app.get('/about', function (req, res) {
	res.send('Hello About');
});
app.get('/login', function (req, res) {
	var result = {};
	result.push({ code: 200 });

	res.send(result);
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});
