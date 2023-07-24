const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const axios = require("axios").default;

app.use(bodyParser.urlencoded());
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", async function(req, res){
	try {
		let response = await axios.get("https://bored-api.appbrewery.com/random");
		let data = response.data;
		res.render("index", {data: data})
	}catch(error){
		console.log(error);
		res.render("index")
	}
})

app.post("/", async function(req, res){
	let type = req.body.type;
	let participants = req.body.participants;
	try {
		let response = await axios.get("https://bored-api.appbrewery.com/filter?type="+req.body.type+"&participants="+req.body.participants);
		let data = response.data;
		let result = data[Math.floor(Math.random() * data.length)];
		console.log(result);
		res.render("index", {data: result});
	}catch(error){
		console.log(error.message);
		res.render("index")
	}
})


app.listen(3000, function(){
	console.log("you're listening to port 3000");
})