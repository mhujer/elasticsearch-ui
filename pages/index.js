import React from 'react'
import elasticsearch from 'elasticsearch'


export default class App extends React.Component {

  state = {data: []}

  async componentDidMount() {
    const client = new elasticsearch.Client({
      host: '127.0.0.1:9200',
      log: 'trace'
    })
    const data = await client.cat.indices({
      format: 'json',
      requestTimeout: 30000
    })
    this.setState({data})
  }

  render() {
    return (
      <div>
        {
          this.state.data.map(item =>
            <div>
              <h1>{item.index}</h1>
              <div></div>
              <small>{item.health}</small>
            </div>
          )
        }

        <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
      </div>
    )
  }

}
