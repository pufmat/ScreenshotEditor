function ArrowAction(color, thickness){
	Action.call(this);
	this.color = color;
	this.thickness = thickness;
	
	this.startPos = undefined;
	this.endPos = undefined;
}
ArrowAction.prototype = Object.create(Action.prototype);
ArrowAction.prototype.move = function(pos){
	if(!this.startPos){
		this.startPos = pos;
		return;
	}
	this.endPos = pos;
};
ArrowAction.prototype.isValid = function(){
	return this.startPos && this.endPos;
};
ArrowAction.prototype.render = function(renderData){
	if(this.startPos && this.endPos){
		renderData.ctx.fillStyle = this.color;
		renderData.ctx.strokeStyle = this.color;
		renderData.ctx.lineWidth = this.thickness;
		renderData.ctx.lineJoin = "miter";
		renderData.ctx.lineCap = "butt";
		
		var tmp = Vec2.sub(this.startPos, this.endPos).normalize().mul(this.thickness);
		
		renderData.ctx.beginPath();
		renderData.ctx.moveTo(this.startPos.x, this.startPos.y);
		renderData.ctx.lineTo(this.endPos.x + tmp.x * 3, this.endPos.y + tmp.y * 3);
		renderData.ctx.stroke();
		renderData.ctx.beginPath();
		renderData.ctx.moveTo(this.endPos.x, this.endPos.y);
		renderData.ctx.lineTo(this.endPos.x + tmp.x * 4 - tmp.y * 3, this.endPos.y + tmp.y * 4 + tmp.x * 3);
		renderData.ctx.lineTo(this.endPos.x + tmp.x * 4 + tmp.y * 3, this.endPos.y + tmp.y * 4 - tmp.x * 3);
		renderData.ctx.closePath();
		renderData.ctx.fill();
	}
	return renderData;
};