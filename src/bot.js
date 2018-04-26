const mongoose = require('mongoose');
//mongoose.connect(process.env.MONGO_URL);

const redis = require('redis');
//const redisClient = redis.createClient(process.env.REDIS_URL);

const { Wit } = require('node-wit');
const witClient = new Wit({ accessToken: process.env.WIT_TOKEN });

const languages = require('../languages');

const logLevel = process.env.LOG_LEVEL || 'verbose';
const requiredConfidenceLevel = parseFloat(process.env.CONFIDENCE_LEVEL) || 0.6;

const intents = require('../intents');

/**
 * This function returns the first top level intent
 */
const getTopLevelOrFirstIntent = (entities) => {
	let topLevelIntentKeys = Object.keys(intents);

	let i = 0;
	for (i < entities.intent.length; i++; ) {
		let currentEntity = entities.intent[i];

		if (topLevelIntentKeys.indexOf(currentEntity.value) > -1) {
			return currentEntity;
		}
	}

	return entities.intent[0];
};

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
			return languages[currentLanguage].missingIntent;
		}

		let likelyIntent = getTopLevelOrFirstIntent(data.entities);
		let intentKeyArray = likelyIntent.value.split('.');
		let rootIntentKey = intentKeyArray.shift();

		this.log('Found intent key: ' + likelyIntent.value + ' with confidence: ' + likelyIntent.confidence, 'verbose');

		// Not confident enough
		if (likelyIntent.confidence < requiredConfidenceLevel) {
			return languages[currentLanguage].missingIntent;
		}

		if (intents[rootIntentKey]) {
			return await intents[rootIntentKey](intentKeyArray, data);
		}

		if (rootIntentKey === 'endStatement') {
			return null;
		}

		if (!languages[currentLanguage][rootIntentKey]) {
			return languages[currentLanguage].notImplementedYet;
		}

		return languages[currentLanguage][rootIntentKey];
	}
}

module.exports.Bot = Bot;
