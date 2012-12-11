exports['common'] = {
	rootPath: '..',
	tests: ['test/*-test.js']
};

exports['node-tests'] = {
	environment: 'node',
	extends: 'common'
};

exports['browser-tests'] = {
	environment: 'browser',
	extends: 'common',
	libs: ['lib/curl/src/curl.js', 'test/amd-config.js'],
	resources: ['app/**/*.js', 'lib/**/*.js'],
	extensions: [require('buster-amd')]
};