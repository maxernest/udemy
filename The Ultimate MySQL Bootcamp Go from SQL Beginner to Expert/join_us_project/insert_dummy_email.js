const { fakerID_ID } = require('@faker-js/faker');
const mysql = require("mysql");

const faker = fakerID_ID;

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'join_us'
});

let users = [];

for (let i = 0; i < 500; i++) {
  const email = [faker.internet.email()];
  users.push(email);
}
console.log(users);

connection.connect();

const query = `INSERT INTO email (email) VALUES ?`;
connection.query(query, [users], function (error, results, fields) {
	if (error) throw error;
	console.log("done ...");
});

connection.end();