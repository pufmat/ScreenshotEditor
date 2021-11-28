function Action(){
	this.finished = false;
}
Action.prototype.move = function(pos){

};
Action.prototype.finish = function(){
	this.finished = true;
};
Action.prototype.isValid = function(){
	return false;
};
Action.prototype.render = function(renderData){
	return renderData;
};