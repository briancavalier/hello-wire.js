(function(buster, define) {
define(function(require) {
	var HelloWired = require('../app/HelloWired');

	buster.testCase('HelloWired', {
		'sayHello': {
			'should set innerHTML of node': function() {
				var mockNode, helloWired, message;

				mockNode = {};
				helloWired = new HelloWired(mockNode);
				message = 'test';

				helloWired.sayHello(message);
				buster.assert.match(mockNode.innerHTML, message);
			}
		}
	});

});
})(
	this.buster || require('buster'),
	typeof define == 'function' && define.amd ? define : function(factory) { factory(require); }
);