let elasticsearch = require('elasticsearch');
let client = new elasticsearch.Client({
	host: '127.0.0.1:9200',
	log: 'trace'
});
const response = client.info({
	requestTimeout: 30000,
});

response.then((res) => {
	console.dir(res);
});


export default () => <div>Welcome to next.js!</div>
