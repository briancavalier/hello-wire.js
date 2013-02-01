(function(buster, wire, plugin) {
	"use strict";

	var assert, refute, fail, steps;

	assert = buster.assert;
	refute = buster.refute;
	fail = buster.assertions.fail;

	steps = ['create', 'configure', 'initialize', 'connect', 'ready', 'destroy'].reduce(
		function(lifecycle, step) {
			lifecycle.push(step + ':before');
			lifecycle.push(step);
			lifecycle.push(step + ':after');
			return lifecycle;
		}, []
	);

	buster.testCase('lifecycle', {

		tearDown: function() {
			delete plugin.wire$plugin;
		},

		'step order': {
			setUp: function() {

				// Setup a plugin that will record lifecycle steps
				plugin.wire$plugin = function() {
					var instance, order;

					instance = {};
					order = 0;

					steps.forEach(function(step) {
						instance[step] = function(resolver, proxy) {
							if(!proxy.target.lifecycle) proxy.target.lifecycle = [];
							proxy.target.lifecycle.push(step);
							resolver.resolve();
						}
					});

					return instance;
				};
			},

			'should be consistent': function(done) {
				wire({
					component: { module: './test/node/fixtures/object' },
					fixture: { literal: {} }
				}).then(
					function(context) {
						var component = context.fixture;

						// Ensure that create thru ready happen in order, and that
						// destroy does not happen
						assert.equals(component.lifecycle, steps.slice(0, steps.length-3));

						// Ensure that destroy happens and is always last
						return context.destroy().then(
							function() {
								assert.equals(component.lifecycle, steps);
							},
							fail
						);
					},
					fail
				).always(done);
			}
		},

		'should fail when encountering unrecognized facets': function(done) {
			wire({
				component: {
					literal: {},
					foo: 123
				}
			}).then(
				fail,
				function(e) {
					assert.match(e.toString(), 'foo');
				}
			).always(done);
		},

		'should allow dual module/plugin to have options': function(done) {
			plugin.wire$plugin = this.stub().returns({});

			wire({
				component: {
					create: './test/node/fixtures/object',
					foo: 123
				}
			}).then(
				function(c) {
					assert.calledOnce(c.component.wire$plugin);
				},
				fail
			).always(done);
		}

	});

})(
	require('buster'),
	require('../..'),
	require('./fixtures/object')
);