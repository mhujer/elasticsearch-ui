import React from 'react'
import elasticsearch from 'elasticsearch'

import CustomHead from '../components/Header'
import Menu from '../components/Menu';
import IndexHealthBadge from '../components/IndexHealthBadge';


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
          <div className="row">
            {
              this.state.data.map(item =>
                <div key={item.uuid} className="col-sm-4">
                  <div className="card">
                    <div className="card-block">
                      <h4 className="card-title">
                        {item.index} &nbsp;
                        <IndexHealthBadge health={item.health}/>
                      </h4>
                      <p className="card-text">
                        <span className="badge badge-primary">
                          {item['docs.count']} documents
                        </span>
                        &nbsp;
                        <span className="badge badge-primary">
                          {item['store.size']}
                        </span>
                      </p>
                      <p className="card-text">
                        <span className="badge badge-pill badge-default">
                          Primary shards: {item['pri']}
                        </span>
                        &nbsp;
                        <span className="badge badge-pill badge-default">
                          Replicas: {item['rep']}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              )
            }
          </div>

          {/*<pre>{JSON.stringify(this.state.data, null, 2)}</pre>*/}
        </div>
      </div>
    )
  }

}
