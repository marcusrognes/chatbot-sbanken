const { Bot } = require('./src/bot');
const PORT = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');
const currentBot = new Bot();
const server = express();

server.set('port', PORT);
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.get('/', async function(req, res) {
	res.send('Jeg fungerer!');
});

/**
 * Token check from facebook api
 */
server.get('/webhook/', async function(req, res) {
	if (req.query['hub.verify_token'] === process.env.FACEBOOK_VERIFY_TOKEN) {
		res.send(req.query['hub.challenge']);

		return;
	}

	res.send('Wrong token');
});

server.post('/webhook/', async function(req, res) {
	console.log(req.body);

	const entries = req.body.entry[0].messaging;

	console.log('entries', entries);

	res.sendStatus(200);
});

server.listen(server.get('port'), async function() {
	console.log('Up and running on port: ' + PORT);
});
