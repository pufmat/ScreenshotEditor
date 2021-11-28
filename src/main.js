var originalImage;

var prevPos = new Vec2(0, 0);
var mousePressed = false;

var scale = 100;
var transform = new Vec2(0, 0);

var selectedTool = TOOL_NONE;
var prevSelectedTool = TOOL_NONE;

var actionManager = new ActionManager();
var currentAction = 0;

function main(){

	document.addEventListener("contextmenu", function(event){
		if(event.target.id != "preview"){
			event.preventDefault();
		}
	}, false);

	document.getElementById("start").addEventListener("click", function(event){
		document.getElementById("file").click();
	}, false);
	document.getElementById("file").addEventListener("change", function(event){
		handleFiles(event.target.files);
	}, false);
	document.getElementById("drop-zone").addEventListener("dragenter", function(event){
		event.stopPropagation();
		event.preventDefault();
	}, false);
	document.getElementById("drop-zone").addEventListener("dragover", function(event){
		event.stopPropagation();
		event.preventDefault();
	}, false);
	document.getElementById("drop-zone").addEventListener("drop", function(event){
		event.stopPropagation();
		event.preventDefault();
		handleFiles(event.dataTransfer.files);
	}, false);
	document.addEventListener("paste", function(event){
		var items = event.clipboardData.items;
		for(var i = 0; i < items.length; i++){
			var item = event.clipboardData.items[i];
			handleFiles([item.getAsFile()]);
		}
	}, false);
		
	document.getElementById("menu").addEventListener("dragstart", function(event){
		if(event.target.id != "preview"){
			event.preventDefault();
		}
	}, false);
}

function handleFiles(files){
	if(files.length != 1){
		return;
	}
	
	var file = files[0];
	if(!file){
		return;
	}
	if(file.type){
		if(!file.type.startsWith("image/")){
			return;
		}
	}
	
	var fileReader = new FileReader();
	fileReader.onload = function(){
	
		var image = new Image();
		image.onload = function(){
			startEditor(image);
		};
		image.src = fileReader.result;
	};
	fileReader.readAsDataURL(file);
}

function startEditor(image){
	document.getElementById("drop-zone").style.display = "none";
	document.getElementById("canvas").style.display = "block";
	
	setupCanvas();
	setupGUI();
	
	setTool(TOOL_MOVE);
	
	originalImage = image;
	render();
}

function setTool(tool){
	selectedTool = tool;
	if(tool == TOOL_MOVE){
		canvas.style.cursor = "move";
	}else{
		canvas.style.cursor = "crosshair";
	}
}

function onMouseDown(pos, btn){
	if(mousePressed){
		return;
	}

	if(btn == BUTTON_MIDDLE){
		prevSelectedTool = selectedTool;
		setTool(TOOL_MOVE);
	}
	
	switch(selectedTool){
	case TOOL_DRAW:
		currentAction = new DrawAction(drawSettings.color, drawSettings.thickness);
		break;
	case TOOL_ARROW:
		currentAction = new ArrowAction(arrowSettings.color, arrowSettings.thickness);
		break;
	case TOOL_BLUR:
		currentAction = new BlurAction();
		break;
	case TOOL_CROP:
		currentAction = new CropAction();
		break;
	}
	
	if(currentAction){
		actionManager.addAction(currentAction);
		render();
	}
	
	mousePressed = true;
	prevPos = pos;
}

function onMouseMove(pos){
	if(!mousePressed){
		return;
	}

	if(selectedTool == TOOL_MOVE){
		transform.x += prevPos.x - pos.x;
		transform.y += prevPos.y - pos.y;
		updateBounds();
		render();
	}else{
		if(currentAction){
			currentAction.move(getPosOnImage(pos));
			render();
		}
	}
	
	prevPos = pos;
}

function onMouseUp(pos, btn){
	if(!mousePressed){
		return;
	}

	if(prevSelectedTool != TOOL_NONE){
		setTool(prevSelectedTool);
		prevSelectedTool = TOOL_NONE;
	}
	
	if(currentAction){
	
		currentAction.move(getPosOnImage(pos));
		currentAction.finish();
		if(!currentAction.isValid()){
			actionManager.undo();
		}
		currentAction = 0;
		
		render();
	}
	
	mousePressed = false;
}

function onResize(){
	closeSubmenu();
	updateBounds();
	render();
}

function onMouseWheel(dir){
	changeScale(dir);
}

function changeScale(dir){
	var x = (canvasWidth / 2 + transform.x);
	var y = (canvasHeight / 2 + transform.y);
	
	transform.x -= x;
	transform.y -= y;

	x /= (scale / 100.0);
	y /= (scale / 100.0);
		
	do{
		scale += dir;
	}while(scale % 25 != 0);
	
	if(scale > 300){
		scale = 300;
	}
	if(scale < 25){
		scale = 25;
	}
		
	x *= (scale / 100.0);
	y *= (scale / 100.0);
			
	transform.x += x;
	transform.y += y;
	
	updateBounds();
	render();
}

function updateBounds(){
	if(getScaledRenderWidth() > canvasWidth){
		if(transform.x < 0){
			transform.x = 0;
		}
		if(transform.x > getScaledRenderWidth() - canvasWidth){
			transform.x = getScaledRenderWidth() - canvasWidth;
		}
	}else{
		transform.x = (getScaledRenderWidth() - canvasWidth) / 2.0;
	}
	if(getScaledRenderHeight() > canvasHeight){
		if(transform.y < 0){
			transform.y = 0;
		}
		if(transform.y > getScaledRenderHeight() - canvasHeight){
			transform.y = getScaledRenderHeight() - canvasHeight;
		}
	}else{
		transform.y = (getScaledRenderHeight() - canvasHeight) / 2.0;
	}
}

function getPosOnImage(pos){
	var x = Math.round(renderMinX + ((pos.x + transform.x) / (scale / 100.0)));
	var y = Math.round(renderMinY + ((pos.y + transform.y) / (scale / 100.0)));
	return new Vec2(x, y);
}

function getScaledRenderWidth(){
	return Math.round(renderWidth * (scale / 100.0));
}

function getScaledRenderHeight(){
	return Math.round(renderHeight * (scale / 100.0));
}

window.addEventListener("load", function(){
	main();
}, false);
