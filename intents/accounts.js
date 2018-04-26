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
	},
	async detailed(keyArray, data) {
		if (!data.entities.account) {
			return languages['nb'].accounts.detailedMissingAccount;
		}

		let accountString = data.entities.account[0].value;

		if (!accountString) {
			return languages['nb'].accounts.detailedMissingAccount;
		}

		const accounts = await sbanken.getAccountDetails();

		let foundAccount = null;

		accounts.forEach((account) => {
			let index = account.name.toLowerCase().indexOf(accountString.toLowerCase());
			if (index > -1) {
				foundAccount = account;

				return false;
			}
		});

		if (!foundAccount) {
			return languages['nb'].accounts.detailedMissingAccount;
		}

		//console.log(foundAccount);

		return {
			text: languages['nb'].accounts.detailed.text
				.replace('{{account}}', foundAccount.name)
				.replace('{{accountNumber}}', '**************')//foundAccount.accountNumber)
				.replace('{{balance}}', foundAccount.balance)
				.replace('{{available}}', foundAccount.available)
				.replace('{{accountType}}', foundAccount.accountType)
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
