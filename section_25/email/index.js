const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: "652d6de0b955226ffcea167b96fddd0c-us21",
  server: "us21",
});

const listId = "c450411129";

async function run(email, firstName, lastName) {
	console.log(email, firstName, lastName, listId);
  const response = await mailchimp.lists.addListMember(listId, {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: firstName,
      LNAME: lastName
    }
  });
  return new Promise(function(resolve){
	  console.log(`Successfully added contact as an audience member. The contact's id is ${response.id}.`);
	  resolve();
  })
}


app.use(bodyParser.urlencoded());
app.use(express.static("public"));

app.get("/", function(req, res){
	res.sendFile(__dirname+"/sign-up.html");
})

app.post("/", async function(req, res){
	let email = req.body.email;
	let firstName = req.body.firstName;
	let lastName = req.body.lastName;
	await run(email, firstName, lastName);
	res.send("Successfully added contact as an audience member.");
})

app.get("*", function(req, res){
	res.send("error 404 !!!");
})

app.listen(3000, function(){
	console.log("server is running at port 3000, localhost:3000");
})