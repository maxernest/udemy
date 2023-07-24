const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const axios = require("axios");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");

app.get("/", async function(req, res){
	try{
		response = await axios.get("https://secrets-api.appbrewery.com/random");
		let secret = response.data.secret;
		let username = response.data.username;
		res.render("index", {secret : secret, username : username});
	}catch(error){
		console.log(error.message);
		setTimeout(function(){
			res.redirect('/');	
		}, 1000);
	}
})


app.listen(3000, function(){
	console.log("you're listening to port 3000");
})