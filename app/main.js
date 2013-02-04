// This is a [wire.js](https://github.com/briancavalier/wire) wiring spec
// for the simple [hello-wire](https://github.com/briancavalier/hello-wire)
// example.  For more information, check out the [README](https://github.com/briancavalier/hello-wire),
// and the [wire.js docs](https://github.com/briancavalier/wire/wiki)

// Standard AMD module define() wrapper
define({
	// A regular String.  Basic Javascript types are supported directly
	// in wiring specs, even non-primitives like Date and RegExp.
	message: 'I haz been wired',

	// Create an instance of the hello-wired module.
	helloWired: {

		// The hello-world module returns a constructor function, which
		// wire.js will call to create the instance, passing a single
		// parameter, the DOM Node whose id is "hello".  This uses
		// JSON Reference syntax along with the `dom:first!` resolver provided
		// by the `wire/dom` plugin below.
		create: {
			module: 'app/HelloWire',
			args: { $ref: 'dom:first!.hello' }
		},

		// Invoke the sayHello method on the instance after it is
		// created, and pass a single parameter, the message String
		// defined above.  Again, you can use JSON Reference syntax to
		// reference other objects in the wiring spec.
		ready: {
			sayHello: { $ref: 'message' }
		}
	},

	plugins: [
		// The debug plugin outputs wiring progress and diagnostic info
		// to the console. Turning on trace will trace method calls on
		// components in this spec.  In the console, You'll see the call
		// to helloWired.sayHello, as well as when it returns.
		{ module: 'wire/debug', trace: true },
		// Load the basic wire.js dom plugin, which provides the `dom!`
		// resolver used above.
		{ module: 'wire/dom', namespace: 'dom' }
	]
});