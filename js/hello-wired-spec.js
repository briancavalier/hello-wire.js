define({
	message: "I haz been wired",
	helloWired: {
		create: {
			module: 'hello-wired',
			args: { $ref: 'dom!hello' }
		},
		init: {
			sayHello: { $ref: 'message' }
		}
	},
	plugins: [
		{ module: 'wire/dom' }
	]
});