var bg, node, fill;
var mousePosition0, mousePosition1, mousePosition2;
var HEIGHT, WIDTH;

var radialSliderPos;

var flag = 0;

init ();

function init () {
	bg = document.getElementById("background");
	fill = document.getElementById("fill");
	node = document.getElementById("node");
	
	var bgPos = {x: getCSSValue(bg.style.left), y: getCSSValue(bg.style.top)};
	console.log(bgPos)
	
	radialSliderPos = getPos(bg);
	
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
	
	document.addEventListener('mousedown', function (event) {
		flag = 1;
	}, false);
	
	document.addEventListener('mousemove', function (event) {
		if (flag == 1) {
			showCoords(event);
		}
	}, false);
	
	document.addEventListener('mouseup', function (event) {
		flag = 0;
	}, false);
	
	//node.style.transform = "translateX(140px)";
	
	animate();
}

function animate () {
	requestAnimationFrame(animate);
}

function showCoords(event) {
	radialSliderPos = getPos(bg);
    var X = event.clientX;
    var Y = event.clientY;
	var x = X - radialSliderPos.x - bg.offsetWidth;
	var y = -Y + radialSliderPos.y;
	
    mousePosition0 = {"x": X, "y": Y};
	mousePosition2 = {"x": x, "y": y};
	//console.log(mousePosition2);
	calcAngle();
}

function calcAngle () {
	var angleRad = Math.atan(mousePosition2.y/mousePosition2.x);
	var angleDeg = Math.degrees(angleRad);
	var xPos, yPos;
	var offSet;
	//console.log(angleRad);
	
	angleRad = Math.radians(angleDeg);
	
	if(mousePosition2.x > 0) {
		
		xPos = Math.cos(angleRad);
		
		if (mousePosition2.y >= 0) {
			angleDeg = angleDeg;
			yPos = Math.sin(angleRad);
			
			node.style.left = (((xPos*250)+WIDTH)/2)-7.5;
			node.style.top = (((-yPos*250)+HEIGHT)/2);
		}
		
		else {
			angleDeg = 360 + angleDeg;
			yPos = Math.sin(angleRad);
			
			node.style.left = (((xPos*250)+WIDTH)/2)-7.5;
			node.style.top = (((-yPos*250)+HEIGHT)/2);
		}
	}
	else if (mousePosition2.x < 0) {
		
		xPos = -Math.cos(angleRad);
		
		if (mousePosition2.y >= 0) {
			angleDeg = 180 + angleDeg;
			yPos = Math.sin(angleRad);
			
			node.style.left = (((xPos*250*2)+WIDTH)/2)-7.5;
			node.style.top = (((yPos*250)+HEIGHT)/2);
		}
		
		else {
			angleDeg = 180 + angleDeg;
			yPos = Math.sin(angleRad);
			
			node.style.left = (((xPos*250*2)+WIDTH)/2)-7.5;
			node.style.top = (((yPos*250)+HEIGHT)/2);
		}
	}
	
	console.log(angleDeg);
	drawMask();
	
	fill.style.opacity = angleDeg/360;

}

var ctx = fill.getContext('2d');

// Create an image element
var img = document.getElementById('fillImg');

// When the image is loaded, draw it
img.onload = function () {
	drawMask();
}

function drawMask () {
	ctx.clearRect(0, 0, fill.width, fill.height);
	
	var nodePosX = getCSSValue(node.style.left);
	var nodePosY = getCSSValue(node.style.top);
	
	// Save the state, so we can undo the clipping
	ctx.save();

	// Create a shape, of some sort
	ctx.beginPath();
	ctx.moveTo(210, 105);
	ctx.lineTo(105,105);
	ctx.lineTo(nodePosX,nodePosY);
	ctx.closePath();
	// Clip to the current path
	ctx.clip();
	
	console.log(nodePosX);

	ctx.drawImage(img, 0, 0, 210, 210);

	// Undo the clipping
	ctx.restore();
}

// Specify the src to load the image
img.src = "data/radialFill.png";

function getPos(el) {
    // yay readability
    for (var lx=0, ly=0;
         el != null;
         lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
    return {x: lx,y: ly};
}

function getCSSValue (val) {
	
	var v1 = val.substring(0, val.length-2);
	
	return parseFloat(v1);
}

// Converts from degrees to radians.
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
 
// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};
	
	