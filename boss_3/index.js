const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");

var posts = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("dashboard.ejs", {posts : posts});
})

app.get("/about", function(req, res){
	post = {
		"title" : "About",
		"content" : "Netus et malesuada fames ac turpis egestas sed tempus. Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum. Pretium lectus quam id leo in. Pharetra magna ac placerat vestibulum lectus mauris ultrices. Consectetur adipiscing elit duis tristique. At risus viverra adipiscing at in. Rhoncus dolor purus non enim praesent. Turpis massa tincidunt dui ut ornare. Dictum non consectetur a erat nam at lectus. Lectus nulla at volutpat diam ut venenatis tellus in. Ultricies tristique nulla aliquet enim tortor at. Egestas sed tempus urna et pharetra pharetra massa."
	};
	res.render("post.ejs", {post : post});
})

app.get("/contact", function(req, res){
	post = {
		"title" : "Contact",
		"content" : "Dui sapien eget mi proin sed libero. A lacus vestibulum sed arcu. Blandit massa enim nec dui nunc mattis. Tempor id eu nisl nunc mi ipsum faucibus. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Sed elementum tempus egestas sed sed risus pretium quam. Pretium nibh ipsum consequat nisl vel pretium lectus. Porttitor rhoncus dolor purus non enim praesent elementum facilisis. Nibh tellus molestie nunc non blandit massa enim nec. Dignissim cras tincidunt lobortis feugiat vivamus. Tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Senectus et netus et malesuada fames ac turpis egestas maecenas. A scelerisque purus semper eget duis at tellus at. Faucibus nisl tincidunt eget nullam non. Eleifend mi in nulla posuere. Aliquam nulla facilisi cras fermentum. Aenean pharetra magna ac placerat vestibulum lectus."
	}
	res.render("post.ejs", {post : post});
})

app.get("/compose", function(req, res){
	res.render("insert_post.ejs");
})

app.post("/compose", function(req, res){
	posts.push({
		"title" : req.body.title,
		"content" : req.body.content
	})
	res.redirect("/");
})

app.get("/post/:index", function(req, res){
	const index = req.params.index;
	post = posts[index];
	res.render("post.ejs", {post : post});
})

app.listen(3000, function(){
	console.log("you're listening to port 3000");
})