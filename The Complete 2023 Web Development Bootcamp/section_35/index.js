const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function getToday(){
	return new Promise(function(resolve){
		const date = new Date();
		const tanggal = date.toJSON().slice(0, 10);
		const hari = weekday[date.getDay()];
		const today = hari+", "+tanggal;
		resolve(today);
	})
}

async function connectMongoose(){
 return new Promise(async function(resolve){
 	await mongoose.connect("mongodb://localhost:27017/listDB");
	const listsSchema = new mongoose.Schema({
		type : {
			type : String,
			required : true
		},
		tugas : {
			type : String,
			required : true
		}
	}) 
	try{
		var lists = mongoose.model("list", listsSchema);
	}catch(err){
		var lists = mongoose.model("list");
	}finally{
		resolve(lists);
	}
	
 })
}

async function retrieveLists(type){
	return new Promise(async function(resolve){
		const lists = await connectMongoose();
		const result = await lists.find({ type : type}).exec();
		resolve(result);
	})
}

async function insertLists(type, tugas){
	return new Promise(async function(resolve){
		const lists = await connectMongoose();
		const result = await lists.create({
			type : type,
			tugas : tugas
		});
		resolve();
	})
}

async function deleteLists(id){
	return new Promise(async function(resolve){
		const lists = await connectMongoose();
		await lists.deleteOne({
			_id : id
		});
		resolve();
	})
}

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");

app.get("/", async function(req, res){
	res.redirect("/home");
})

app.get("/:type", async function(req, res){
	type = req.params.type.toLowerCase();
	const result = await retrieveLists(type);
	const today = await getToday();
	res.render("index", {lists : result, type : type});
})

app.post("/insert/:type", async function(req, res){
	type = req.params.type.toLowerCase();
	await insertLists(type, req.body.list);
	res.redirect("/"+req.params.type);
})

app.get("/done/:type/:id", async function(req, res){
	type = req.params.type.toLowerCase();
	await deleteLists(req.params.id);
	res.redirect("/"+type);
})

app.listen(3000, function(){
	console.log("you're listening to port 3000");
})