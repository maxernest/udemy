const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

var articles = undefined;

async function connectingToDb(){
	return new Promise(async function(resolve){
		await mongoose.connect("mongodb://localhost:27017/wikiDB");
		const wikiSchema = new mongoose.Schema({
			title : {
				type : String,
				required : true
			},
			content : {
				type : String,
				required : true
			}
		})
		articles = mongoose.model("article", wikiSchema);
		console.log("success connecting to mongodb server, database : wikiDB, model : articles");
		resolve();
	})
}

async function retrieveData(id){
	return new Promise(async function(resolve){
		if(id === undefined){
			var lists = await articles.find();
		}else{
			var lists = await articles.findById(id);
		}
		resolve(lists);
	})
}

async function createData(title, content){
	return new Promise(async function(resolve){
		var answer = await articles.create({
			title : title,
			content : content
		});
		resolve(answer);
	})
}

async function updateData(id, title, content){
	return new Promise (async function(resolve){
		if (title === undefined && content === undefined) {
			var answer = "invalid parameter, please input yout update in the body !!";

		}else if (title === undefined){
			var answer = await articles.findByIdAndUpdate(id, {content : content});
		}else if (content === undefined){
			var answer = await articles.findByIdAndUpdate(id, {title : title});
		}else{
			var answer = await articles.findByIdAndUpdate(id, {
				title : title, 
				content : content
			}, {
				overwrite : true
			});
		}
		resolve(answer);
	})
}

async function deleteData(id){
	return new Promise(async function(resolve){
		if(id === undefined){
			var answer = await articles.deleteMany();
		}else {
			var answer = await articles.findByIdAndDelete(id);
		}
		resolve(answer);
	})
}

app.route("/article")

	.get(async function(req, res){
		let lists = await retrieveData();
		res.send(lists);
	})

	.post(async function(req, res){
		let answer = await createData(req.body.title, req.body.content);
		res.send(answer);
	})

	.delete(async function(req, res){
		let answer = await deleteData(req.body.title, req.body.content);
		res.send(answer);
	})

app.route("/article/:id")
	.get(async function(req, res){
		let lists = await retrieveData(req.params.id);
		res.send(lists);
	})
	.put(async  function(req, res){
		let answer = await updateData(req.params.id, req.body.title, req.body.content);
		res.send(answer);
	})
	.patch(async  function(req, res){
		let answer = await updateData(req.params.id, req.body.title, req.body.content);
		res.send(answer);
	})
	.delete(async  function(req, res){
		let answer = await deleteData(req.params.id);
		res.send(answer);
	})

app.get("*", async function(req, res){
	res.send("you're lost bro !!");
})

app.listen(3000, async function(){
	await connectingToDb();
	console.log("you're listening in port 3000");
})