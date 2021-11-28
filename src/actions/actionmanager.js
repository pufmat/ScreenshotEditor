function ActionManager(){
	this.actions = [];
	
	this.tmpCanvas = document.createElement("canvas");
	this.tmpCtx = this.tmpCanvas.getContext("2d");
}
ActionManager.prototype.undo = function(){
	if(this.hasAction()){
		this.actions.pop();
	}
};
ActionManager.prototype.hasAction = function(){
	return this.actions.length > 0;
};
ActionManager.prototype.addAction = function(action){
	this.actions.push(action);
};
ActionManager.prototype.render = function(image){
	this.tmpCanvas.width = image.width;
	this.tmpCanvas.height = image.height;
	this.tmpCtx.drawImage(image, 0, 0);

	var renderData = new RenderData(this.tmpCanvas, this.tmpCtx, 0, 0, this.tmpCanvas.width, this.tmpCanvas.height);
	for(var i = 0; i < this.actions.length; i++){
		renderData = this.actions[i].render(renderData);
	}
	return renderData;
};