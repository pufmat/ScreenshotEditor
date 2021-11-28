var renderMinX = 0;
var renderMinY = 0;
var renderWidth = 0;
var renderHeight = 0;

var prevRenderWidth = 0;
var prevRenderHeight = 0;

var scale = 100;
var transform = new Vec2(0, 0);

function render(){
	var renderData = actionManager.render(originalImage);
	
	renderWidth = renderData.maxX - renderData.minX;
	renderHeight = renderData.maxY - renderData.minY;
	renderMinX = renderData.minX;
	renderMinY = renderData.minY;
	
	if(prevRenderWidth != renderWidth || prevRenderHeight != renderHeight){
		var ratio0 = renderWidth / renderHeight;
		var ratio1 = canvasWidth / canvasHeight;
		if(ratio0 < ratio1){
			scale = Math.floor(canvasHeight / renderHeight * 100.0);
		}else{
			scale = Math.floor(canvasWidth / renderWidth * 100);
		}
		if(scale > 300){
			scale = 300;
		}
		if(scale < 25){
			scale = 25;
		}
		updateBounds();
	}
	
	prevRenderWidth = renderWidth;
	prevRenderHeight = renderHeight;
	
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	ctx.drawImage(renderData.canvas, 
			renderData.minX, renderData.minY, 
			renderWidth, renderHeight,
			-transform.x, -transform.y, 
			getScaledRenderWidth(), getScaledRenderHeight()
	);
}

function renderToImage(){
	var tmpCanvas = document.createElement("canvas");
	var tmpCtx = tmpCanvas.getContext("2d");
	
	var renderData = actionManager.render(originalImage);
	
	tmpCanvas.width = renderData.maxX - renderData.minX;
	tmpCanvas.height = renderData.maxY - renderData.minY;
	
	tmpCtx.drawImage(renderData.canvas, 
			renderData.minX, renderData.minY, 
			tmpCanvas.width, tmpCanvas.height,
			0, 0, 
			tmpCanvas.width, tmpCanvas.height
	);
	
	return tmpCanvas;
}