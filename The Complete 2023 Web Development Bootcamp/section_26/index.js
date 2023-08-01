const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");

let lists = [];
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

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");

app.get("/", async function(req, res){
	const today = await getToday();
	res.render("index", {lists : lists, date : today});
})

app.post("/", function(req, res){
	lists.push(req.body.list);
	res.redirect("/");
})

app.get("/done/:index", function(req, res){
	lists.splice(req.params.index, 1);
	res.redirect("/");
})

app.listen(3000, function(){
	console.log("you're listening to port 3000");
})