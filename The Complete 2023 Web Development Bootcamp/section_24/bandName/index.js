const express = require("express");
const app = express();
const bodyParser = require("body-parser");

function logger(req, res, next){
	console.log("request method : "+req.method);
	console.log("request url : "+req.url);
	next();
}

app.use(logger);
app.use(bodyParser.urlencoded());

app.get("/", function (req, res){
	res.sendFile(__dirname+"/index-band.html");
})

app.post("/submit", function (req, res){
	res.write("<h1>Your band name is :</h1>");
	res.end("<h2>" +req.body.street + " "+ req.body.pet+ "<h2>");
})

app.listen(3000, function(){
	console.log("you're listening to port 3000");
})