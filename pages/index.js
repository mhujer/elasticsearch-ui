let elasticsearch = require('elasticsearch');
let client = new elasticsearch.Client({
	host: '127.0.0.1:9200',
	log: 'trace'
});
client.ping({
	requestTimeout: 30000,
}, function (error) {
	if (error) {
		console.error('elasticsearch cluster is down!');
	} else {
		console.log('All is well');
	}
});

export default () => <div>Welcome to next.js!</div>
