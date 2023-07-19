function w(){
	document.querySelector(".w").classList.add("pressed");
	let audio1 = new Audio("./sounds/tom-1.mp3");
	audio1.play();
}
function a(){
	document.querySelector(".a").classList.add("pressed");
	let audio2 = new Audio("./sounds/tom-2.mp3");
	audio2.play();
}
function s(){
	document.querySelector(".s").classList.add("pressed");
	let audio3 = new Audio("./sounds/tom-3.mp3");
	audio3.play();
}
function d(){
	document.querySelector(".d").classList.add("pressed");
	let audio4 = new Audio("./sounds/tom-4.mp3");
	audio4.play();
}
function j(){
	document.querySelector(".j").classList.add("pressed");
	let audio5 = new Audio("./sounds/snare.mp3");
	audio5.play();
}
function k(){
	document.querySelector(".k").classList.add("pressed");
	let audio6 = new Audio("./sounds/crash.mp3");
	audio6.play();
}
function l(){
	document.querySelector(".l").classList.add("pressed");
	let audio7 = new Audio("./sounds/kick-bass.mp3");
	audio7.play();
}

function w0(){
	document.querySelector(".w").classList.remove("pressed");
}
function a0(){
	document.querySelector(".a").classList.remove("pressed");
}
function s0(){
	document.querySelector(".s").classList.remove("pressed");
}
function d0(){
	document.querySelector(".d").classList.remove("pressed");
}
function j0(){
	document.querySelector(".j").classList.remove("pressed");
}
function k0(){
	document.querySelector(".k").classList.remove("pressed");
}
function l0(){
	document.querySelector(".l").classList.remove("pressed");
}

document.addEventListener("keydown", (event) => {
	let name = event.key;
	let code = event.code;

	switch (name){
		case "w":
			w();
			break;
		case "a":
			a();
			break;
		case "s":
			s();
			break;
		case "d":
			d();
			break;
		case "j":
			j();
		case "k":
			k();
			break;
		case "l":
			l();
			break;
	}
})

document.addEventListener("keypress", (event) => {
	let name = event.key;
	let code = event.code;

	switch (name){
		case "w":
			w();
			break;
		case "a":
			a();
			break;
		case "s":
			s();
			break;
		case "d":
			d();
			break;
		case "j":
			j();
		case "k":
			k();
			break;
		case "l":
			l();
			break;
	}
})

document.addEventListener("keyup", (event) => {
	let name = event.key;
	let code = event.code;

	switch (name){
		case "w":
			w0();
			break;
		case "a":
			a0();
			break;
		case "s":
			s0();
			break;
		case "d":
			d0();
			break;
		case "j":
			j0();
			break;
		case "k":
			k0();
			break;
		case "l":
			l0();
			break;
	}
})

