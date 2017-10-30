const mongo = require('../mongo').mongo;
const validators = require('../validators');
const Server = require('socket.io');
const io = new Server(3333, {
  path: '/',
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: true
});

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = 'secretone';

io.sockets.on('connection', function (socket) {
	function getCookie(cookie, cookiename) {
		// Get name followed by anything except a semicolon
		var cookiestring = RegExp('' + cookiename + '[^;]+').exec(cookie);
		// Return everything after the equal sign, or an empty string if the cookie name not found
		return unescape(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,'') : '');
	}

	let token = getCookie(socket.handshake.headers.cookie, 'token');

	jwt.verify(token, secret, function(err, decoded) {
		if (err) {
			socket.disconnect();
		} else {
			console.log('valid');
			// Т.к. чат простой - в качестве ников пока используем первые 5 символов от ID сокета
			var ID = (socket.id).toString().substr(0, 5);
			var time = (new Date).toLocaleTimeString();
			// Посылаем клиенту сообщение о том, что он успешно подключился и его имя
			// socket.emit('socket_updateConnection', { 'id': ID, 'time': time });



			// Посылаем всем остальным пользователям, что подключился новый клиент и его имя
			// socket.broadcast.json.send({'event': 'userJoined', 'name': ID, 'time': time});

			setTimeout(function () {
				socket.emit('customEmit', 123);
				mongo.getAllVertexes().then(function (vertexes) {
					console.log('Got all vertexes');
					console.log(vertexes);
					socket.emit('getVertexes', vertexes);
				});
				mongo.getAllEdges().then(function (edges) {
					console.log('Got all edges');
					console.log(edges);
					socket.emit('getEdges', edges);
				});
				io.sockets.emit('updateConnection', { 'id': ID, 'time': time });
				// socket.on('addArticle', function (article) {
				// 	mongo.addArticle(article, ({ops}) => {
				// 		// console.log('--------', result);
				// 		socket.emit('getArticle', ops[0]);
				// 	});
				// });

				// socket.on('removeArticle', function (articleId) {
				// 	mongo.removeArticle(articleId, () => {
				// 		socket.emit('removeArticle', articleId);
				// 	});
				// });

				socket.on('removeVertex', function (id) {
					mongo.removeVertex(id).then(function () {
						io.sockets.emit('removeVertex', id);
					});
				});


				socket.on('addVertex', function (data) {
					mongo.addVertex(data).then(function (vertex) {
						io.sockets.emit('addVertex', vertex);
					});
				});

				socket.on('editVertex', function (data) {
					mongo.editVertex(data).then(function (vertex) {
						console.log('EDIT', vertex)
						socket.broadcast.emit('editVertex', Object.assign(vertex[0], data.changed));
					});
				});


				socket.on('addEdge', function (data) {
					var validationResult = true;
					validation = [
						validators.vertexId(data.source).then(function (result) {
							if (!result || result.length !== 1) validationResult = false;
						}),
						validators.vertexId(data.target).then(function (result) {
							if (!result || result.length !== 1) validationResult = false;
						})
					];
					Promise.all(validation).then(function () {
						if (!validationResult) return;
						mongo.addEdge(data).then(function (vertex) {
							io.sockets.emit('addVertex', vertex);
						});
					});
				});

			}, 1000);

			// Навешиваем обработчик на входящее сообщение
			// socket.on('message', function (msg) {
			// 	var time = (new Date).toLocaleTimeString();
			// 	// Уведомляем клиента, что его сообщение успешно дошло до сервера
			// 	socket.json.send({'event': 'messageSent', 'name': ID, 'text': msg, 'time': time});
			// 	// Отсылаем сообщение остальным участникам чата
			// 	socket.broadcast.json.send({'event': 'messageReceived', 'name': ID, 'text': msg, 'time': time})
			// });
			


			// При отключении клиента - уведомляем остальных
			// socket.on('disconnect', function() {
			// 	var time = (new Date).toLocaleTimeString();
			// 	io.sockets.json.send({'event': 'userSplit', 'name': ID, 'time': time});
			// });
		}
	});
});