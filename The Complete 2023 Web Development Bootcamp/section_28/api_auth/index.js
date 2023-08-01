const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");
const ejs = require("ejs");

const apiKey = "d3c550ab-6ae4-47cd-aca7-abf515ba2202";
const username = "maxernest";
const password = "maxernest";
const token = "183789da-46ad-4131-a596-6d859ea3b273";

app.use(express.static("public"));
app.use(bodyParser.urlencoded());
app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("index");
})

app.get("/noAuth", async function(req, res){
	try{
		response = await axios.get("https://secrets-api.appbrewery.com/random");
		result = response.data;
		console.log(response.status);
		res.render("index", {data : JSON.stringify(result)});
	}catch(error){
		console.log(error.message);
	}
})

app.get("/auth", async function(req, res){
	try{
		response = await axios.get("https://secrets-api.appbrewery.com/all?page=1", {
			auth : {
				username : username,
				password : password
			}
		});
		result = response.data;
		console.log(response.status);
		res.render("index", {data : JSON.stringify(result)});
	}catch(error){
		console.log(error.message);
	}
})

app.get("/api", async function(req, res){
	try{
		url = "https://secrets-api.appbrewery.com/filter?score=5&apiKey="+apiKey;
		response = await axios.get(url);
		result = response.data;
		console.log(response.status);
		res.render("index", {data : JSON.stringify(result)});
	}catch(error){
		console.log(error.message);
	}
})

app.get("/token", async function(req, res){
	try{
		response = await axios.get("https://secrets-api.appbrewery.com/secrets/1", { headers : {
			Authorization: "Bearer "+ token
		}});
		result = response.data;
		console.log(response.status);
		res.render("index", {data : JSON.stringify(result)});
	}catch(error){
		console.log(error.message);
	}
})

app.listen(3000, function(){
	console.log("you're listening to port 3000");
})