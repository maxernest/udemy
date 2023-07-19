//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is maxernest
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded());

app.get("/", function(req, res){
	res.sendFile(__dirname+"/public/index.html");
})

app.post("/check", function(req, res){
	let pass = req.body.password;
	if (pass == "maxernest"){
		res.sendFile(__dirname+"/public/secret.html");
	}else{
		res.redirect("/");
	}
})

app.listen(3000, function(){
	console.log("listening to port 3000");
})