p1 = Math.floor(Math.random() * 6 + 1);
p2 = Math.floor(Math.random() * 6 + 1);

if(p1 > p2){
	document.querySelector("h1").innerHTML = "🚩 Play 1 Wins!";
}else if (p1 < p2){
	document.querySelector("h1").innerHTML = "Play 2 Wins! <br> 🚩";
}else if (p1 == p2){
	document.querySelector("h1").innerHTML = "Draw!";
}

function img(score){
	switch(score){
	case 1 :
		return ("./images/dice1.png");
		break;
	case 2 :
		return ("./images/dice2.png");
		break;
	case 3 :
		return ("./images/dice3.png");
		break;
	case 4 :
		return ("./images/dice4.png");
		break;
	case 5 :
		return ("./images/dice5.png");
		break;
	case 6 :
		return ("./images/dice6.png");
		break;
	}
}

document.querySelector(".img1").src = img(p1);
document.querySelector(".img2").src = img(p2);