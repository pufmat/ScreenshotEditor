var drawSettings = {color: 0, thickness: 0};
var arrowSettings = {color: 0, thickness: 0};
var highlightSettings = {color: 0};

function setupGUI(){
	selectIcon("move");
	
	document.addEventListener("mousedown", function(event){
		if(event.target.id != "preview"){
			event.preventDefault();
		}
		if(isElementOutsiteSubmenu(event.target)){
			closeSubmenu();
		}
	}, false);
	document.addEventListener("touchstart", function(event){
		event.preventDefault();
		for(var i = 0; i < event.changedTouches.length; i++){
			var touch = event.changedTouches[i];
			if(isElementOutsiteSubmenu(touch.target)){
				closeSubmenu();
			}
		}
	}, false);
	
	document.addEventListener("keydown", function(event){
		if(event.ctrlKey && (event.which == 90 || event.keyCode == 90 || event.key == 'z')){
			actionManager.undo();
			render();
		}
	}, false);

	document.getElementById("move").addEventListener("mouseup", function(event){
		selectIcon("move");
		setTool(TOOL_MOVE);
	}, false);
	document.getElementById("draw").addEventListener("mouseup", function(event){
		selectIcon("draw");
		if(event.button != BUTTON_LEFT || selectedTool == TOOL_DRAW){
			showSubmenu("draw");
		}
		setTool(TOOL_DRAW);
	}, false);
	document.getElementById("arrow").addEventListener("mouseup", function(event){
		selectIcon("arrow");
		if(event.button != BUTTON_LEFT || selectedTool == TOOL_ARROW){
			showSubmenu("arrow");
		}
		setTool(TOOL_ARROW);
	}, false);
	document.getElementById("blur").addEventListener("mouseup", function(event){
		selectIcon("blur");
		setTool(TOOL_BLUR);
	}, false);
	document.getElementById("crop").addEventListener("mouseup", function(event){
		selectIcon("crop");
		setTool(TOOL_CROP);
	}, false);
	document.getElementById("zoomin").addEventListener("mouseup", function(event){
		changeScale(1);
	}, false);
	document.getElementById("zoomout").addEventListener("mouseup", function(event){
		changeScale(-1);
	}, false);
	document.getElementById("undo").addEventListener("mouseup", function(event){
		actionManager.undo();
		render();
	}, false);
	document.getElementById("save").addEventListener("mouseup", function(event){
		document.getElementById("preview").src = renderToImage().toDataURL("image/png");
		showSubmenu("save");
	}, false);
	
	document.getElementById("button-save").addEventListener("click", function(event){
		var image = renderToImage();
		image.toBlob(function(blob) { 
			var a = document.createElement("a");
			a.download = "image" + (new Date().getTime()) + ".png";
			a.href = URL.createObjectURL(blob);
			a.click();
			closeSubmenu();
		});
	}, false);
	document.getElementById("button-copy").addEventListener("click", function(event){
		var image = renderToImage();
		if(typeof navigator.clipboard !== "undefined" && typeof navigator.clipboard.write !== "undefined"){
			image.toBlob(function(blob) { 
				navigator.clipboard.write([new ClipboardItem({"image/png": blob})]);
				closeSubmenu();
			});
		}else{
			alert("To copy image to clipboard please right-click the preview image and then click \"Copy image\".");
		}
	}, false);
	
	
	setupSubmenuColorGroup("draw", function(color){
		drawSettings.color = color;
	});
	setupSubmenuThicknessGroup("draw", function(thickness){
		drawSettings.thickness = thickness;
	});

	setupSubmenuColorGroup("arrow", function(color){
		arrowSettings.color = color;
	});
	setupSubmenuThicknessGroup("arrow", function(thickness){
		arrowSettings.thickness = thickness;
	});
	
	document.getElementById("draw").parentElement.getElementsByClassName("c0")[0].click();
	document.getElementById("draw").parentElement.getElementsByClassName("t1")[0].click();
	document.getElementById("arrow").parentElement.getElementsByClassName("c0")[0].click();
	document.getElementById("arrow").parentElement.getElementsByClassName("t1")[0].click();
	
	removeClass(document.getElementsByClassName("container")[0], "disabled");
}

function setupSubmenuColorGroup(submenuId, callback){
	var elements = document.getElementById(submenuId).parentElement.getElementsByClassName("submenu")[0].getElementsByClassName("color-group")[0].getElementsByClassName("icon");
	for(var i = 0; i < elements.length; i++){
		var element = elements[i];
		element.addEventListener("click", (function(element){
			return function(event){
				selectSubmenuIcon(submenuId, element);
				callback(getComputedStyle(element.getElementsByTagName("div")[0]).getPropertyValue("background-color"));
			};
		})(element), false);
	}
}

function setupSubmenuThicknessGroup(submenuId, callback){
	var elements = document.getElementById(submenuId).parentElement.getElementsByClassName("submenu")[0].getElementsByClassName("thickness-group")[0].getElementsByClassName("icon");
	for(var i = 0; i < elements.length; i++){
		var element = elements[i];
		element.addEventListener("click", (function(element){
			return function(event){
				selectSubmenuIcon(submenuId, element);
				callback(parseInt(getComputedStyle(element.getElementsByTagName("div")[0]).getPropertyValue("width"), 10));
			};
		})(element), false);
	}
}

function selectIcon(iconId){
	var container = document.getElementsByClassName("container")[0];
	var elements = document.getElementsByClassName("selected");
	for(var i = 0; i < elements.length; i++){
		var element = elements[i];
		if(element.parentElement == container || element.parentElement.parentElement == container){
			removeClass(element, "selected");
		}
	}
	addClass(document.getElementById(iconId), "selected");
}

function selectSubmenuIcon(submenuId, iconElement){
	var elements = iconElement.parentElement.getElementsByClassName("selected");
	for(var i = 0; i < elements.length; i++){
		removeClass(elements[i], "selected");
	}
	addClass(iconElement, "selected");
}

function isElementOutsiteSubmenu(originalElement){
	var isOutsize = true;
	var element = originalElement;
	while(element.parentElement){
		if(element.className.includes("submenu")){
			isOutsize = false;
			break;
		}
		element = element.parentElement;
	}
	return isOutsize;
}

function showSubmenu(submenuId){
	var elements = document.getElementsByClassName("visible");
	for(var i = 0; i < elements.length; i++){
		removeClass(elements[i], "visible");
	}
	addClass(document.getElementById(submenuId).parentElement.getElementsByClassName("submenu")[0], "visible");
}

function closeSubmenu(){
	var elements = document.getElementsByClassName("visible");
	for(var i = 0; i < elements.length; i++){
		removeClass(elements[i], "visible");
	}
}

function addClass(element, className){
	if(!element.className.includes(className)){
		element.className += " " + className;
	}
}

function removeClass(element, className){
	element.className = element.className.replace(className, "").trim();
}