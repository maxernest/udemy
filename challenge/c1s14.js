const prompt=require("prompt-sync")({sigint:true});

let name = prompt("what is your name : ");
name = name.toLowerCase();
let temp = 0;
for (let i in name){
	if (i == 0){
		name = name.replace(name[i], name[i].toUpperCase());
	}else if(name[i] == " "){
		temp = 1;
	}else if(temp == 1){
		name = name.replace(name[i], name[i].toUpperCase());
		temp = 0;
	}
}
console.log("hello, "+ name);