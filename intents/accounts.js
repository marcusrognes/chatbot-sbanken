const languages = require('../languages');
const intentTree = {
	async sum(keyArray, data) {
		return languages['nb'].accounts.sum;
	},
	async list(keyArray, data) {
		return languages['nb'].accounts.list;
	}
};

module.exports = async (keyArray, data) => {
	let key = keyArray.shift();

	if (!key) {
		return await intentTree.log(keyArray, data);
	}

	return await intentTree[key](keyArray, data);
};
