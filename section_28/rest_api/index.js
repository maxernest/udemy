const express = require("express")
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const axios = require("axios");

const token = "183789da-46ad-4131-a596-6d859ea3b273";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("index", {content : "Waiting for data ..."})
})

app.post("/get-secret", async function(req, res){
	try{
		let id = req.body.id;
		response = await axios.get("https://secrets-api.appbrewery.com/secrets/"+id, {headers : {
			Authorization: "Bearer "+ token
		}});
		result = JSON.stringify(response.data);
		res.render("index", {content : result});
	}catch(error){
		res.render("index", {content : error.message});
	}
})

app.post("/post-secret", async function(req, res){
	try{
		let secret = req.body.secret;
		let score = req.body.score;
		response = await axios.post("https://secrets-api.appbrewery.com/secrets", {
			secret : secret,
			score : score
		}, { headers : {
				Authorization : "Bearer "+token
			}
		})
		result =  JSON.stringify(response.data);
		res.render("index", {content : result});
	}catch(error){
		res.render("index", {content : error.message});
	}
})

app.post("/put-secret", async function(req, res){
	try{
		respose = await axios.put("https://secrets-api.appbrewery.com/secrets/"+req.body.id, {
			secret : req.body.secret,
			score : req.body.score
		}, { headers : {
			Authorization : "Bearer "+token
		}})
	}catch(error){
		res.render("index", {content : error.message});
		console.log(error.response.data);
	}
})

app.post("/patch-secret", async function(req, res){
	try{
		respose = await axios.patch("https://secrets-api.appbrewery.com/secrets/"+req.body.id, {
			secret : req.body.secret,
			score : req.body.score
		}, { headers : {
			Authorization : "Bearer "+token
		}})
	}catch(error){
		res.render("index", {content : error.message});
		console.log(error.response.data);
	}
})

app.post("/delete-secret", async function(req, res){
	try{
		respose = await axios.put("https://secrets-api.appbrewery.com/secrets/"+req.body.id, { headers : {
			Authorization : "Bearer "+token
		}})
	}catch(error){
		res.render("index", {content : error.message});
		console.log(error.response.data);
	}
})

app.listen(3000, function(){
	console.log("you're listening to port 3000");
})