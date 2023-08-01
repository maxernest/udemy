//jshint esversion:6
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const passport = require("passport");
const passportLocalMongoose = require('passport-local-mongoose');
const session = require("express-session")
const mongoose = require("mongoose");
const LocalStrategy = require('passport-local').Strategy;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema = new mongoose.Schema({
  username : String
})

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model("user", userSchema);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new LocalStrategy(User.authenticate()));

app.get("/", function(req, res){
  if (req.isAuthenticated()){
    res.render("home");
  }else{
    res.redirect("/login");
  }
})

app.get("/login", function(req, res){
  if (req.isAuthenticated()){
    res.redirect("/");
  }else{
    res.render("login");
  }
})

app.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: false }), function(req, res) {
    console.log("login berhasil");
    res.redirect('/');
  });

app.get("/register", function(req, res){
  if (req.isAuthenticated()){
    res.redirect("/");
  }else{
    res.render("register");
  }
})

app.post("/register", function(req, res){
  User.register({username : req.body.username}, req.body.password, function(err){
    if(err){
      console.log(err);
      res.redirect("/register");
    }else{
      passport.authenticate("local")(req, res, function(){
        console.log("user registered");
        res.redirect("/");
      })
    }
  })
})

app.get("/logout", function(req, res){
  req.logout(function(){
    res.redirect("login");
  });
})

app.listen(3000, function(){
  console.log("you're server is running at port 3000");
})