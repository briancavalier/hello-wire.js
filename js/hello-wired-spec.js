// This is a [wire.js](https://github.com/briancavalier/wire) wiring spec
// for the simple [hello-wire](https://github.com/briancavalier/hello-wire)
// example.  For more information, check out the [README](https://github.com/briancavalier/hello-wire),
// and the [wire.js docs](https://github.com/briancavalier/wire/wiki)

// Standard AMD module define() wrapper
define({
	// A regular String.  Basic Javascript types are supported directly
	// in wiring specs, even non-primitives like Date and RegExp.
	message: "I haz been wired",
	
	// Create an instance of the hello-wired module.
	helloWired: {

		// The hello-world module returns a constructor function, which
		// wire.js will call to create the instance, passing a single
		// parameter, the DOM Node whose id is "hello".  This uses
		// JSON Reference syntax along with the `dom!` resolver provided
		// by the `wire/dom` plugin below.
		create: {
			module: 'hello-wired',
			args: { $ref: 'dom!hello' }
		},
		
		// Invoke the sayHello method on the instance after it is
		// created, and pass a single parameter, the message String
		// defined above.  Again, you can use JSON Reference syntax to
		// reference other objects in the wiring spec.
		init: {
			sayHello: { $ref: 'message' }
		}
	},
	
	plugins: [
		// The debug plugin outputs wiring progress and diagnostic info
		// to the console
		{ module: 'wire/debug' },
		// Load the basic wire.js dom plugin, which provides the `dom!`
		// resolver used above.
		{ module: 'wire/dom' }
	]
});