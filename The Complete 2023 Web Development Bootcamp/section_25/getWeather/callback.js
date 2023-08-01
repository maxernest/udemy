function last(name){
	console.log("it all end here "+name);
}

function first(name, callback){
	setTimeout(function(){
		console.log("it all start here "+ name);
		callback(name);
	},2000);
}

function akhir(){
	console.log("berakhir di sini");
}

function awal(){
	setTimeout(function(){
		console.log("berawal dari sini");
	}, 1000);
}


//with callback
first("max", last);

//without callback
awal();
akhir();