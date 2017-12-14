import React from 'react'
import elasticsearch from 'elasticsearch'


export default class App extends React.Component {

  state = {data: null}

  async componentDidMount() {
    const client = new elasticsearch.Client({
    	host: '127.0.0.1:9200',
    	log: 'trace'
    })
    const data = await client.info({
    	requestTimeout: 30000
    })
    this.setState({data})
  }

  render() {
    return (
      <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
    )
  }

}
