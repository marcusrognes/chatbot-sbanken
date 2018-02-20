// Root key represents stories
const defaultQuickReplies = [
	{
		content_type: 'text',
		title: 'Mine kontoer',
		payload: 'accounts'
	},
	{
		content_type: 'text',
		title: 'De 10 siste transaksjonene',
		payload: 'latest_transactions'
	}
];

module.exports = {
	missingIntent: {
		text: 'Jeg skjønte ikke helt hva du mente,\n ( jeg er desverre en ung "bot" :( )',
		quick_replies: defaultQuickReplies
	},
	notImplementedYet: {
		text: 'Jeg har desverre ikke lært meg dette enda!',
		quick_replies: defaultQuickReplies
	},
	greet: {
		text: 'Hei!',
		quick_replies: defaultQuickReplies
	},
	howAreYou: {
		text: 'Jeg har det fint!'
	},
	accounts: {
		list: {
			text: 'Dine kontoer er: {{accounts}}'
		},
		total: {
			text: 'Du har totalt {{sum}}kr tilgjengelig.'
		},
		detailed: {
			text: 'Konto: {{account}}\nKonto nr: {{accountNumber}}\nKonto type:{{accountType}}\nBalanse: {{balance}}kr\nTilgjengelig: {{available}}'
		},
		detailedMissingAccount: {
			text: 'Jeg kjente ikke igjen kontoen'
		}
	}
};
