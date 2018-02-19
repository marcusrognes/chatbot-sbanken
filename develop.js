const readline = require('readline');
const beautify = require('json-beautify');
const { Bot } = require('./src/bot');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const currentBot = new Bot();

const ask = () => {
	rl.question('You: ', async (message) => {
		let reply = 'Bot: ';
		let response = await currentBot.message(message);

		if (!response) {
			return ask();
		}

		reply = reply + '\n' + beautify(response, null, 2, 100);

		console.log(reply);

		ask();
	});
};

ask();
