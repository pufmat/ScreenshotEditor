function Vec2(x, y){
	this.x = x;
	this.y = y;
}
Vec2.dist = function(a, b){
	return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
};
Vec2.distSq = function(a, b){
	return (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y);
};
Vec2.add = function(a, b){
	return new Vec2(a.x + b.x, a.y + b.y);
};
Vec2.sub = function(a, b){
	return new Vec2(a.x - b.x, a.y - b.y);
};
Vec2.mul = function(a, i){
	return new Vec2(a.x * i, a.y * i);
};
Vec2.prototype.clone = function(){
	return new Vec2(this.x, this.y);
};
Vec2.prototype.set = function(x, y){
	this.x = x;
	this.y = y;
	return this;
};
Vec2.prototype.zero = function(){
	this.x = 0;
	this.y = 0;
	return this;
};
Vec2.prototype.add = function(i){
	this.x += i.x;
	this.y += i.y;
	return this;
};
Vec2.prototype.sub = function(i){
	this.x -= i.x;
	this.y -= i.y;
	return this;
};
Vec2.prototype.mul = function(i){
	this.x *= i;
	this.y *= i;
	return this;
};
Vec2.prototype.normalize = function(){
	var i = Math.sqrt(this.x * this.x + this.y * this.y);
	if(i != 0){
		var j = 1 / i;
		this.x *= j;
		this.y *= j;
	}
	return this;
};
Vec2.prototype.len = function(){
	return Math.sqrt(this.x * this.x + this.y * this.y);
};
Vec2.prototype.lenSq = function(){
	return this.x * this.x + this.y * this.y;
};
Vec2.prototype.dot = function(i){
	return this.x * i.x + this.y * i.y;
};
Vec2.prototype.cross = function(i){
	return this.x * i.y - this.y * i.x;
};