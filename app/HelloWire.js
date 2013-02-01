// A simple module that defines the HelloWired "class", i.e. a constructor
// with a prototype, that has a single method, sayHello.  For more
// information, check out the [README](https://github.com/briancavalier/hello-wire),
// and the [wire.js docs](https://github.com/briancavalier/wire/wiki)

// Standard AMD define wrapper
define([], function() {
	
	// The constructor takes a single parameter, the DOM Node in which it
	// will render the message passed to sayHello.
	function HelloWire(node) {
		this._node = node;
	}
	
	HelloWire.prototype = {
		// The sayHello method takes a message String and renders it to
		// the DOM Node that was supplied to the constructor.
		sayHello: function(message) {
			this._node.innerHTML = "Hello! " + message;
		}
	};
	
	// Return the constructor
	return HelloWire;
});