var canvas;
var ctx;
var canvasWidth;
var canvasHeight;
function setupCanvas(){
	canvas = document.getElementById("canvas");
	
	//mouse support
	canvas.addEventListener("mousemove", function(event){
		var x = (event.clientX - canvas.getBoundingClientRect().left);
		var y = (event.clientY - canvas.getBoundingClientRect().top);
		onMouseMove(new Vec2(x, y));
	});
	canvas.addEventListener("mousedown", function(event){
		var x = (event.clientX - canvas.getBoundingClientRect().left);
		var y = (event.clientY - canvas.getBoundingClientRect().top);
		onMouseDown(new Vec2(x, y), event.button);
	});
	canvas.addEventListener("mouseup", function(event){
		var x = (event.clientX - canvas.getBoundingClientRect().left);
		var y = (event.clientY - canvas.getBoundingClientRect().top);
		onMouseUp(new Vec2(x, y), event.button);
	});
	canvas.addEventListener("wheel", function(event){
		if(event.deltaY < 0){
			onMouseWheel(1);
		}else{
			onMouseWheel(-1);
		}
	});
	
	//touch screen support
	canvas.addEventListener("touchstart", function(event){
		event.preventDefault();
		for(var i = 0; i < event.changedTouches.length; i++){
			var touch = event.changedTouches[i];
			var x = (touch.clientX - canvas.getBoundingClientRect().left);
			var y = (touch.clientY - canvas.getBoundingClientRect().top);
			onMouseDown(new Vec2(x, y), BUTTON_LEFT);
		}
	});
	canvas.addEventListener("touchmove", function(event){
		event.preventDefault();
		for(var i = 0; i < event.changedTouches.length; i++){
			var touch = event.changedTouches[i];
			var x = (touch.clientX - canvas.getBoundingClientRect().left);
			var y = (touch.clientY - canvas.getBoundingClientRect().top);
			onMouseMove(new Vec2(x, y));
		}
	});
	canvas.addEventListener("touchend", function(event){
		event.preventDefault();
		for(var i = 0; i < event.changedTouches.length; i++){
			var touch = event.changedTouches[i];
			var x = (touch.clientX - canvas.getBoundingClientRect().left);
			var y = (touch.clientY - canvas.getBoundingClientRect().top);
			onMouseUp(new Vec2(x, y), BUTTON_LEFT);
		}
	});
	
	ctx = canvas.getContext("2d");
	canvasWidth = canvas.clientWidth;
	canvasHeight = canvas.clientHeight;
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
}
window.onresize = function(){
	if(canvas && ctx){
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		canvasWidth = canvas.clientWidth;
		canvasHeight = canvas.clientHeight;
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
		onResize();
	}
};