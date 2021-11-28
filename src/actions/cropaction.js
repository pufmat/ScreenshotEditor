function CropAction(){
	RectAction.call(this);
}
CropAction.prototype = Object.create(RectAction.prototype);
CropAction.prototype.render = function(renderData){
	if(this.a && this.b){
		if(this.finished){
			renderData.minX = this.a.x;
			renderData.minY = this.a.y;
			renderData.maxX = this.b.x;
			renderData.maxY = this.b.y;
		}else{
			renderData.ctx.fillStyle = "rgba(0,0,0,0.3)";
			renderData.ctx.fillRect(renderData.minX, renderData.minY, renderData.maxX - renderData.minX, this.a.y - renderData.minY);
			renderData.ctx.fillRect(renderData.minX, this.b.y, renderData.maxX - renderData.minX, renderData.maxY - this.b.y);
			renderData.ctx.fillRect(renderData.minX, this.a.y, this.a.x - renderData.minX, this.b.y - this.a.y);
			renderData.ctx.fillRect(this.b.x, this.a.y, renderData.maxX - this.b.x, this.b.y - this.a.y);
		}
	}
	return renderData;
};