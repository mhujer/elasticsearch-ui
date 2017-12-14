import elasticsearch from 'elasticsearch';

const client = new elasticsearch.Client({
  host: '127.0.0.1:9200',
  log: 'trace'
})

export default client
