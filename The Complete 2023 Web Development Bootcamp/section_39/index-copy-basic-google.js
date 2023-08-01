//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});

const userSchema = new mongoose.Schema ({
	username: String,
  email: String,
  password: String,
  googleId: String,
  secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
	console.log("serializeUser :", user);
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  const user = await User.findById(id).exec();
  console.log("deserializeUser :", user);
  done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "851054108460-p1eef1upsr6a1ud98536aj46k5s7kj38.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/google/callback",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);

    User.findOrCreate({username: profile.displayName, googleId: profile.id }, function (err, user) {
    	console.log("GoogleStrategy :", user);
      return cb(err, user);
    });
  }
));

app.get("/", function(req, res){
  if (req.isAuthenticated()){
  	console.log("you're username is : ", req.user.username);
    res.render("home");
  } else {
    res.redirect("/login");
  }
});

app.get("/auth/google",
  passport.authenticate('google', { scope: ["profile"] })
);

app.get("/auth/google/callback",
  passport.authenticate('google', { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect to secrets.
    res.redirect("/");
  });

app.get("/login", function(req, res){
  if (req.isAuthenticated()){
    res.redirect("/");
  } else {
    res.render("login");
  }
});

app.get("/register", function(req, res){
  res.render("register");
});


app.get("/submit", function(req, res){
  if (req.isAuthenticated()){
    res.render("submit");
  } else {
    res.redirect("/login");
  }
});

//Once the user is authenticated and their session gets saved, their user details are saved to req.user.
  // console.log(req.user.id);

app.get("/logout", function(req, res){
  req.logout(function(){
  	res.redirect("/");
  });
});

app.post("/register", function(req, res){

  User.register({username: req.body.username}, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/");
      });
    }
  });

});

app.post("/login", function(req, res){

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err){
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/");
      });
    }
  });

});







app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
