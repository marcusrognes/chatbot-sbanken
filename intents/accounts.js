const languages = require('../languages');
const sbanken = require('../src/clients/sbanken');
const intentTree = {
	async total(keyArray, data) {
		const accounts = await sbanken.getAccountDetails();

		return {
			text: languages['nb'].accounts.total.text.replace('{{sum}}', accounts.map(account => account.available).reduce((a, b) => a + b))
		};
	},
	async list(keyArray, data) {
		const accounts = await sbanken.getAccountDetails();

		return {
			text: languages['nb'].accounts.list.text.replace('{{accounts}}', accounts.map(account => account.name).join(', '))
		};
	}
};

module.exports = async (keyArray, data) => {
	let key = keyArray.shift();

	if (!key) {
		return await intentTree.log(keyArray, data);
	}

	return await intentTree[key](keyArray, data);
};
