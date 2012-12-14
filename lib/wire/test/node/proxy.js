(function(buster, delay, proxy) {
"use strict";

var assert, refute, fail;

assert = buster.assert;
refute = buster.refute;
fail = buster.assertions.fail;

buster.testCase('proxy', {
	'should create a base proxy for the supplied target': function() {
		var p, target;

		target = {};
		p = proxy.create(target);

		assert.same(p.target, target);
	},

	'should set properties on target': function() {
		var p, target;

		target = {};

		p = proxy.create(target);
		p.set('test', 1);

		assert.equals(target.test, 1);
	},

	'should get properties on target': function() {
		var p, target;

		target = { test: 1 };
		p = proxy.create(target);

		assert.equals(p.get('test'), 1);
	},

	invoke: {
		'should invoke named methods on target': function() {
			var p, target;

			target = { method: this.spy() };
			p = proxy.create(target);

			p.invoke('method', [1]);
			assert.calledOnceWith(target.method, 1);
		},

		'should invoke function on target': function() {
			var p, target, expectedVal;

			function method(arg) {
				assert.same(this, target);
				assert.equals(arg, expectedVal);
			}

			expectedVal = 1;
			target = {};
			p = proxy.create(target);

			p.invoke(method, [expectedVal]);
		}

	},

	clone: {
		'should return primitives': function() {
			assert.equals(1, proxy.create(1).clone());
		},

		'should clone Function': function() {
			var expected, clone;

			function original() {
				return expected;
			}

			expected = {};
			clone = proxy.create(original).clone();

			refute.same(original, clone);
			assert.same(clone(), expected);
		},

		'should clone Date': function() {
			var clone, original;

			original = new Date();

			clone = proxy.create(original).clone();

			refute.same(original, clone);
			assert.equals(original.getTime(), clone.getTime());
		},

		'should clone RegExp': function() {
			var clone, original;

			original = /123/;

			clone = proxy.create(original).clone();

			refute.same(original, clone);
			assert.equals(original.toString(), clone.toString());
		},

		object: {
			'should clone objects': function() {
				var p, clone, original;

				original = { a: 1 };

				p = proxy.create(original);
				clone = p.clone();

				refute.same(original, clone);
				assert.equals(original, clone);
			},

			'should clone objects deeply when specified': function() {
				var p, clone, original, deepObject, deepArray;

				deepObject = { b: 2 };
				deepArray = [3];
				original = { a: deepObject, b: deepArray };

				p = proxy.create(original);
				clone = p.clone({ deep: true });

				refute.same(deepObject, clone.a);
				assert.equals(deepObject, clone.a);
				
				refute.same(deepArray, clone.b);
				assert.equals(deepArray, clone.b);
			}

		},

		array: {
			'should clone arrays': function() {
				var p, clone, original;

				original = [1, 2, 3];

				p = proxy.create(original);
				clone = p.clone();

				refute.same(original, clone);
				assert.equals(original, clone);
			},

			'should clone arrays deeply when specified': function() {
				var p, clone, original, deepObject, deepArray;

				deepObject = {};
				deepArray = [3];
				original = [deepObject, deepArray];

				p = proxy.create(original);
				clone = p.clone({ deep: true });

				refute.same(deepObject, clone[0]);
				assert.equals(deepObject, clone[0]);

				refute.same(deepArray, clone[1]);
				assert.equals(deepArray, clone[1]);
			}

		}

	}
});
})(
	require('buster'),
	require('when/delay'),
	require('../../lib/proxy')
);