const http = require('mitol');
const finalhandler = require('finalhandler');
const Router = require('router');
const mongo = require('../mongo').mongo;
const concat = require('concat-stream');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = 'secretone';

var router = Router();

function arrayBufferToString(buffer){
    var arr = new Uint8Array(buffer);
    var str = String.fromCharCode.apply(String, arr);
    if(/[\u0080-\uffff]/.test(str)){
        throw new Error("this string seems to contain (still encoded) multibytes");
    }
    return str;
}

router.get('/', function (req, res) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.end('Hello!')
});

router.get('/getAll', function (req, res) {
	res.setHeader('Content-Type', 'application/json; charset=utf-8');
  mongo.getAll(function (result) {
  	res.end(JSON.stringify(result));
  });
});


router.post('/signUp', function (req, res, next) {
	res.setHeader('Content-Type', 'application/json; charset=utf-8');
	whole = '';
	req.on('data', function (chunk){
		whole += arrayBufferToString(chunk);
	});

	// Do something with it
	req.on('end', () => {
			let body = JSON.parse('{' + whole.split('{')[1]);
			let saltRounds = 13;
			bcrypt.hash(body.password, saltRounds, function(err, hash) {
				body.password = hash;
			  mongo.signUp(body, function () {
	      	res.end(whole);
	      });
			});
  });
});


router.post('/login', function (req, res, next) {
	res.setHeader('Content-Type', 'application/json; charset=utf-8');
	whole = '';
	req.on('data', function (chunk){
		whole += arrayBufferToString(chunk);
	});

	// Do something with it
	req.on('end', () => {
			let body = JSON.parse('{' + whole.split('{')[1]);
			let saltRounds = 13;
		  mongo.checkPassword(body, function (result) {
		  	console.log('email - ' + body.email);
      	jwt.sign({ email: body.email, ignoreExpiration: true}, secret, { algorithm: 'HS256' }, function(err, token) {
				  console.log('token - ' + token);
				  console.log('err - ' + err)
				  res.end(JSON.stringify({ token: token }));
				});
			});
  });
});

router.post('/checkToken', function (req, res, next) {
	res.setHeader('Content-Type', 'application/json; charset=utf-8');
	whole = '';
	req.on('data', function (chunk){
		whole += arrayBufferToString(chunk);
	});

	// Do something with it
	req.on('end', () => {
			let body = JSON.parse('{' + whole.split('{')[1]);
			jwt.verify(body.token, secret, function(err, decoded) {
				if (err) {
					res.statusCode = 400;
					res.end(JSON.stringify({ error: 'Token is not valid' }));
				}
			  res.end(JSON.stringify(decoded));
			});
  });
});


 
let server = http.createServer((req, res) => {
    router(req, res, finalhandler(req, res));
});
 
server.listen(3334, () => {
    console.log('Example app listening on port 3334!')
});