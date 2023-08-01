const express = require("express");
const app = express();

function logger (req, res, next){
	console.log("request method : "+req.method);
	console.log("request url : "+req.url);
	next();
}

app.use(logger);

app.get("/", function(req, res){
	res.send("hello");
})

app.listen(3000, function(){
	console.log("you're listening to port 3000");
})