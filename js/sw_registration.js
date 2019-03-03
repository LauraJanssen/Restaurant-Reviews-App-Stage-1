if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./serviceworker.js')
	.then(function() {
		console.log('Registration worked!');
	})
	.catch(function() {
		console.log('Registration failed!');
	});
}