// learning to use body-parser

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));

app.get("/", function (req, res) {
	res.sendFile(__dirname+"/index.html");
})

app.post("/", function(req, res){
	berat = Number(req.body.berat);
	tinggi = Number(req.body.tinggi);
	bmi = berat/(tinggi*tinggi);
	res.send("Yout BMI score is : "+ bmi);
})


app.listen(port, function(){
	console.log("listening at port "+port);
})