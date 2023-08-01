const mongoose = require("mongoose");

async function main(){
	try{
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

		const lists = mongoose.model("list", listsSchema);

		await lists.insertMany([
			{type : "home", tugas : "satu"},
			{type : "home", tugas : "dua"},
			{type : "home", tugas : "tiga"},
			{type : "work", tugas : "one"},
			{type : "work", tugas : "two"},
			{type : "work", tugas : "three"}
		])

//		const daftar = new lists({
//			tugas : "tiga"
//		});

//		await daftar.save();

//		await people.updateOne({name : "John"}, {name : "leon"});

//		await lists.deleteMany({ tugas : "tiga" });

		const results = await lists.find();
		results.forEach(function(result){
			console.log(result.tugas);
		})
	}catch(error){
		console.log(error.message);
	}
		mongoose.connection.close();
		console.log("closed the connection");

}

main();