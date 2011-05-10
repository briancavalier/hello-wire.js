define([], function() {
	function HelloWired(node) {
		this._node = node;
	}
	
	HelloWired.prototype = {
		sayHello: function(message) {
			this._node.innerHTML = "Hello! " + message;
		}
	};
	
	return HelloWired;
});