const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

const redis = require('redis');
const redisClient = redis.createClient(process.env.REDIS_URL);

const { Wit } = require('node-wit');
const witClient = new Wit({ accessToken: process.env.WIT_TOKEN });

const language = {
	nb: require('../languages/nb.js')
};

console.log(language);

class Bot {
	async message(message) {
		let data = await witClient.message(message);

		return await this.doIntent(data);
	}
	async doIntent(data) {
		let currentLanguage = 'nb';

		console.log(data.entities);

		if (!data.entities || !data.entities.intent) {
			return language[currentLanguage].missingIntent;
		}

		let likelyIntent = data.entities.intent[0];
		let intentKey = likelyIntent.value;

		// Not confident enough
		if (likelyIntent.confidence < 0.6) {
			return language[currentLanguage].missingIntent;
		}

		return language[currentLanguage][intentKey];
	}
}

module.exports.Bot = Bot;
