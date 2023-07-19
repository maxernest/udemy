function akhir(name){
	console.log("terakhir "+name);
}

function awal(name){
	let nama = "noel";
	return new Promise(function(resolve){
		setTimeout(function(){
			console.log("awal "+name);
			resolve(nama);
		}, 1000);
	});
}

awal("max").then(akhir);