const color = ["green", "red", "yellow", "blue"];

let mulai = false;
let ans_arr = [];
let usr_arr = [];
let audio = new Audio;

function pressed(warna){
	let id = "#"+warna;
	$(id).addClass("pressed");
	audio.src = "./sounds/"+warna+".mp3";
	audio.play();
	setTimeout(function(){
		$(id).removeClass("pressed");
	}, 200);
}

function get_color(){
	let number = Math.floor(Math.random()*4);
	return (color[number]);

}

$(".btn").click(function(){
	pressed(this.id);
	usr_arr.push(this.id);
	check(usr_arr.length-1);
	console.log(usr_arr);

});

function check(last_element){
	if (ans_arr[last_element] == usr_arr[last_element]){
		if ((last_element+1) == ans_arr.length){
			setTimeout(function(){
				next_level();
			}, 1000);
		}
	}else{
		game_over();
	}
}

function next_level(){
	$("#level-title").text("Level "+(ans_arr.length+1));
	let add = get_color();
	ans_arr.push(add);
	pressed(add);
	usr_arr = [];
	console.log(ans_arr);
}

$(document).on("keydown", function(){
	if (!mulai){
		next_level();
		mulai = true;
	}
})

function game_over(){
	ans_arr = [];
	usr_arr = [];
	mulai = false;
	$("body").addClass("game-over");
	audio.src = "./sounds/wrong.mp3";
	audio.play();
	$("#level-title").text("Game Over, Press Any Key to Restart");
	setTimeout(function(){
		$("body").removeClass("game-over");
	}, 200);
}
