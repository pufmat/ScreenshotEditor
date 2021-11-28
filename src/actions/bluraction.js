function BlurAction(){
	RectAction.call(this);
}
BlurAction.prototype = Object.create(RectAction.prototype);
BlurAction.prototype.render = function(renderData){
	if(this.a && this.b){
		renderData.ctx.filter = "blur(4px)";
		renderData.ctx.drawImage(renderData.canvas, 
				this.a.x, this.a.y, 
				this.b.x - this.a.x, this.b.y - this.a.y,
				this.a.x, this.a.y, 
				this.b.x - this.a.x, this.b.y - this.a.y,
		);
		renderData.ctx.filter = "none";
	}
	return renderData;
};