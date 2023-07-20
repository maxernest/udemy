const express = require("express");
const app = express();
const ejs = require("ejs");
const {uniqueNamesGenerator, Config, adjectives, colors, animals} = require("unique-names-generator");

function nameGenerator(){
	return new Promise(function(resolve){
		let name = uniqueNamesGenerator({
			  dictionaries: [adjectives, colors, animals],
			  separator: ' ',
			  length: 2
			});
			resolve(name);
	})
}

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req,res){
	res.render("index");
})

app.get("/submit", async function(req, res){
	let name = await nameGenerator();
	res.render("index", {name : name});
})

app.listen(3000, function(){
	console.log("you're listening to port 3000");
})