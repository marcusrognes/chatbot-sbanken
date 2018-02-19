const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

const redis = require('redis');
const redisClient = redis.createClient(process.env.REDIS_URL);

const { Wit } = require('node-wit');
const witClient = new Wit({ accessToken: process.env.WIT_TOKEN });

const language = {
	nb: require('../languages/nb.js')
};

const logLevel = process.env.LOG_LEVEL || 'verbose';
const requiredConfidenceLevel = parseFloat(process.env.CONFIDENCE_LEVEL) || 0.6;

class Bot {
	async log(message, level) {
		if (logLevel === 'verbose') {
			console.log(message);

			return;
		}

		if (level === 'verbose') {
			return;
		}

		if (logLevel === 'info') {
			console.log(message);

			return;
		}

		if (level === 'info') {
			return;
		}

		if (logLevel === 'error' && level === 'error') {
			return;
		}
	}

	async message(message) {
		this.log('Bot.message', 'verbose');
		this.log(message, 'verbose');

		let data = await witClient.message(message);

		return await this.doIntent(data);
	}

	async doIntent(data) {
		this.log('Bot.doIntent', 'verbose');
		this.log(data, 'verbose');

		let currentLanguage = 'nb';

		if (!data.entities || !data.entities.intent) {
			return language[currentLanguage].missingIntent;
		}

		let likelyIntent = data.entities.intent[0];
		let intentKey = likelyIntent.value;

		this.log('Found intent key: ' + intentKey + ' with confidence: ' + likelyIntent.confidence, 'verbose');

		// Not confident enough
		if (likelyIntent.confidence < 0.6) {
			return language[currentLanguage].missingIntent;
		}

		if (intentKey === 'endStatement') {
			return null;
		}

		if (!language[currentLanguage][intentKey]) {
			return language[currentLanguage].notImplementedYet;
		}

		return language[currentLanguage][intentKey];
	}
}

module.exports.Bot = Bot;
