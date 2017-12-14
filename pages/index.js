import React from 'react'
import elasticsearch from 'elasticsearch'

import CustomHead from '../components/Header'
import Menu from '../components/Menu';


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
        <CustomHead/>
        <div className="container-fluid">
          <Menu active="index"/>
          {
            this.state.data.map(item =>
              <div key={item.uuid}>
                <h1>{item.index}</h1>
                <div className={`status-${item.health}`}>{item.health}</div>
                <p>
                  {item['docs.count']} documents in {item['store.size']}
                </p>
                <p>
                  Primary shards: {item['pri']},
                  replicas: {item['rep']}
                </p>
              </div>
            )
          }

          <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
        </div>
      </div>
    )
  }

}
