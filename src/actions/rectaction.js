function RectAction(){
	Action.call(this);
	this.startPos = 0;
}
RectAction.prototype = Object.create(Action.prototype);
RectAction.prototype.isValid = function(pos){
	return this.a && this.b;
};
RectAction.prototype.move = function(pos){
	if(!this.startPos){
		this.startPos = pos;
		return;
	}
	
	this.a = new Vec2(Math.min(this.startPos.x, pos.x), Math.min(this.startPos.y, pos.y));
	this.b = new Vec2(Math.max(this.startPos.x, pos.x), Math.max(this.startPos.y, pos.y));
	
	this.a.x = Math.min(Math.max(this.a.x, renderMinX), renderMinX + renderWidth);
	this.a.y = Math.min(Math.max(this.a.y, renderMinY), renderMinY + renderHeight);
	
	this.b.x = Math.min(Math.max(this.b.x, renderMinX), renderMinX + renderWidth);
	this.b.y = Math.min(Math.max(this.b.y, renderMinY), renderMinY + renderHeight);
};