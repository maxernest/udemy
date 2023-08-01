const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'join_us'
});

connection.connect();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
	connection.query("select count(*) as total from email", function (error, results, fields) {
		if (error) throw error;
		const total = results[0].total;
		res.render("index", {total : total});
	});
})

app.post("/", function(req,res){
	const email = req.body.email;
	connection.query(`INSERT INTO email (email) VALUES ("${email}")`, function (error, results, fields) {
		if (error) throw error;
		console.log("successfully insert new email !!!");
		res.redirect("/");
	});
})

app.listen(3000, function(){
	console.log("you're listening to port 3000");
})