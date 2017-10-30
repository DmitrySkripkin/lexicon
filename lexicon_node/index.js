const mitol = require('./mitol');
const ws = require('./ws');
const mongo = require('./mongo').mongo;

mongo.connectMongoose();

// setTimeout(function() { mongo.getAll(function (a) { console.log(a) }) }, 1000);

setTimeout(function() {
	console.log('call');
	// mongo.addVertex({title: 'Hello', content: 'world!'}).then(function(vertex) {
	// 	console.log(vertex);
	// });
	// mongo.getAllVertexes().then(function(vertex) {
	// 	console.log(vertex);
	// });
	// mongo.addEdge({target: '59e3c58d1f1b121c71ec9482', source: '59e3cc2b0691e91eac877ef4'}).then(function(edge) {
	// 	console.log(edge);
	// });
},1000);