const qrcode = require("qrcode");

qrcode.toFile("qr.png", "https://www.instagram.com/", function(err){
	if(err){
		console.log(err);
	}else {
		console.log("your QR code has been created !!");
	}
});
