(function(curl) {

	curl.config({
        packages: [
            { name: 'curl', location: 'lib/curl/src/curl', main: 'curl' },
            { name: 'wire', location: 'lib/wire', main: 'wire' },
            { name: 'when', location: 'lib/when', main: 'when' },
            { name: 'meld', location: 'lib/meld', main: 'meld' },
            { name: 'poly', location: 'lib/poly', main: 'poly' }
        ]
	});

	curl(['wire!app/main']);

})(curl);