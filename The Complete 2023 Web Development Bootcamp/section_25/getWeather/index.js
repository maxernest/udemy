const https = require("https");
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const apiKey = "8ee973e8e0431eac55bb9c749b7eba4e";

async function getWeather(city){
	let latlon = await latitudeLonglitude(city);
	return new Promise(function(resolve){
		console.log(latlon);
		let lat = latlon[0];
		let lon = latlon[1];
		url = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+apiKey;
		https.get(url, function(response){
			response.on("data", function(data){
				let isi = JSON.parse(data);
				resolve(isi);
			})
		})	
	})

}

function latitudeLonglitude(city){
	url = "http://api.openweathermap.org/geo/1.0/direct?q="+city+"&appid="+apiKey;
	return new Promise(function(resolve){
		http.get(url, function(response){
			response.on("data", function(data){
				let isi = JSON.parse(data);
				let lat = isi[0].lat;
				let lon = isi[0].lon;
				console.log(lat, lon);
				resolve([lat, lon]);
			})
		})		
	})
}

app.use(bodyParser.urlencoded({extended : false}));

app.get("/", function (req, res){
	res.sendFile(__dirname+"/index.html");
})

app.post("/", async function(req, res){
	let city = req.body.city;
	let weather = await getWeather(city);
	res.send(weather);
})

app.listen(3000, function(){
	console.log("server is running at port 3000, localhost:3000");
});