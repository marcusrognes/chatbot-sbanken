const btoa = require('btoa');
const fetch = require('node-fetch');
const identityServerUrl = 'https://api.sbanken.no/identityserver/connect/token';
const baseApiUrl = 'https://api.sbanken.no/bank/api/v1/';

module.exports = {
	async getAccessToken() {
		const response = await fetch(identityServerUrl, {
			method: 'POST',
			body: 'grant_type=client_credentials',
			headers: {
				Authorization:
					'Basic ' + btoa(process.env.SBANKEN_APPLICATION_KEY + ':' + process.env.SBANKEN_APPLICATION_SECRET),
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
			}
		});

		const accessData = await response.json();

		return accessData.access_token;
	},
	async getAccountDetails() {
		const accessToken = await this.getAccessToken();

		if (!accessToken) {
			console.log('Missing access token');
			return null;
		}

		const response = await fetch(baseApiUrl + 'accounts/' + process.env.SBANKEN_USER_ID, {
			headers: {
				Authorization: 'Bearer ' + accessToken,
				Accept: 'application/json'
			}
		});

		const data = await response.json();

		return data.items;
	}
};
