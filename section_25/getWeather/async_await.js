function awal(){
	return new Promise(function(resolve){
		setTimeout(function(){
			console.log("awal nya di sini");
			resolve("hallo");
		}, 2000);
	});
}

async function akhir(){
	let isi = await awal();
	console.log(isi);
	console.log("akhir");
}

akhir();