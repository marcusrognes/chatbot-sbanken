const readline = require('readline');
require('dotenv').config();

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const ask = () => {
	rl.question('You: ', (message) => {
		let reply = 'Bot: ';

		console.log(reply);
		ask();
	});
};

ask();
