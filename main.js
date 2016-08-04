var container = document.getElementById("radialSliderContainer");
var	slider  = document.getElementById("slider");
var degrees = document.getElementById("radialSliderDegrees");
var	fill = document.getElementById("radialSliderFill");

var mPos;

var ctx = fill.getContext('2d');
var img = document.getElementById('fillImg');
img.src = "data/radialFill.png";

var sliderWidth = slider.offsetWidth;
var sliderHeight = slider.offsetHeight;
var radius = container.offsetWidth/2;
var deg = 0;

var X = Math.round(radius * Math.sin(deg*Math.PI/180));
var Y = Math.round(radius *  - Math.cos(deg*Math.PI/180));

var sliderCSS = { left: X+radius-sliderWidth/2, top: Y+radius-sliderHeight/2 };

var mdown = false;

slider.addEventListener('mouseover',function (e) {
	slider.style.transform = 'scale(1.5)';
	slider.style.webkit.transition= '0.15s linear 0s';
	slider.style.o.transition= '0.15s linear 0s';
    slider.style.transition= '0.15s linear 0s';
});
slider.addEventListener('mouseout',function (e) {
	slider.style.transform = 'scale(1)';
	slider.style.webkit.transition= '0s linear 0s';
	slider.style.o.transition= '0s linear 0s';
	slider.style.transition= '0s linear 0s';
});

document.addEventListener('mousedown',function (e) {if (e.target == container || e.target == slider) mdown = true; });
document.addEventListener('mouseup',function (e) { mdown = false; });
document.addEventListener('mousemove',function (e) { 
	if(mdown)
	{
		// firefox compatibility
		if(typeof e.offsetX === "undefined" || typeof e.offsetY === "undefined") {
		   var targetOffset = e.target.offset();
		   e.offsetX = e.pageX - targetOffset.left;
		   e.offsetY = e.pageY - targetOffset.top;
		}

		/*if(e.target == container)
			mPos = {x: e.offsetX, y: e.offsetY};*/
		if (e.target == slider)
			mPos = {x: e.target.offsetLeft + e.offsetX, y: e.target.offsetTop + e.offsetY};
		/*else
			mPos = {x: e.offsetX, y: e.offsetY};*/
		
		var atan = Math.atan2(mPos.x-radius, mPos.y-radius);
		deg = -atan/(Math.PI/180) + 180; // final (0-360 positive) degrees from mouse position 
		
		console.log(mPos);
		
		if(deg == 360)
			deg = 0;

		X = Math.round(radius* Math.sin(deg*Math.PI/180));
		Y = Math.round(radius*  -Math.cos(deg*Math.PI/180));

		slider.style.left =  X+radius-sliderWidth/2;
		slider.style.top =  Y+radius-sliderHeight/2;
		drawMask();
	}
});
	
animate();

function animate () {
	requestAnimationFrame(animate);
}

// When the image is loaded, draw it
img.onload = function () {
	drawMask();
}

function drawMask () {
	console.log("Draw");
	ctx.clearRect(0, 0, fill.width, fill.height);
	
// Save the state, so we can undo the clipping
	ctx.save();

// Create a shape, of some sort
	ctx.beginPath();
	ctx.moveTo(105, 105);
	ctx.lineTo(210,105);
	ctx.arc(105, 105, radius, 0, (deg-90) * Math.PI / 180, true);
	//ctx.fill();
	ctx.closePath();
// Clip to the current path
	ctx.clip();

	ctx.drawImage(img, 0, 0);

// Undo the clipping
	ctx.restore();
}



	
	