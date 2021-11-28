function DrawAction(color, thickness){
	Action.call(this);
	this.color = color;
	this.thickness = thickness;
	this.points = [];
}
DrawAction.prototype = Object.create(Action.prototype);
DrawAction.prototype.move = function(pos){
	this.points.push(pos);
};
DrawAction.prototype.isValid = function(pos){
	return this.points.length >= 2;
};
DrawAction.prototype.render = function(renderData){
	if(this.points.length >= 2){
		renderData.ctx.strokeStyle = this.color;
		renderData.ctx.lineWidth = this.thickness;
		renderData.ctx.lineJoin = "round";
		renderData.ctx.lineCap = "round";
		renderData.ctx.beginPath();
		renderData.ctx.moveTo(this.points[0].x, this.points[0].y);
		for(var i = 1; i < this.points.length; i++){
			renderData.ctx.lineTo(this.points[i].x, this.points[i].y);
		}
		renderData.ctx.stroke();
	}
	return renderData;
};