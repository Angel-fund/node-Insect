var mysql = require("mysql");

exports.connectDb =function () {	
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : 'root'
	  // pdatabase: 'contact'
	});
	connection.connect();
	var TEST_DATABASE = 'contact';
	connection.query('USE '+TEST_DATABASE);
	return connection;
}
/*var Client = require('easymysql');

exports.connectDb = function(){
	var mysql = Client.create({
	  'maxconnections' : 10
	});

	mysql.addserver({
	  'host' : 'localhost',
	  'user' : 'root',
	  'password' : 'root'
	});
	var TEST_DATABASE = 'contact';
	mysql.on(TEST_DATABASE, function (queuesize, maxconnections, which) {
		console.log(maxconnections);
	});
	// mysql.query('SHOW DATABASES', function (error, res) {
	//   console.log(res);
	// });
	mysql.query('USE '+TEST_DATABASE, function (error, res) {
	  // console.log(res);
	});
	return mysql;
}*/
// connectDb();

// console.log(client); 
// exports.connectDb = connectDb();
