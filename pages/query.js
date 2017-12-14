import React from 'react'
import client from '../api/client';

export default class Query extends React.Component {

  state = {
    query: '{\n' +
    '\t"index": "price-offers",\n' +
    '\t"body": {\n' +
    '\n' +
    '\t}\n' +
    '}',
    responseBody: '',
    error: null
  }

  handleQueryChange = event => {
    this.setState({
      query: event.target.value
    });
  }

  handleQueryFire = async () => {
    this.setState({
      responseBody: '',
      error: null
    })
    try {
      const responseBody = await client.search(JSON.parse(this.state.query));
      this.setState({responseBody});
    } catch (e) {
      this.setState({
        error: e.message
      });
    }
  }

  render() {
    return (
      <div>
        <div>
          <textarea onChange={this.handleQueryChange} value={this.state.query} rows={10} cols={70}/>
          <br/>
          <button onClick={this.handleQueryFire}>Query!</button>
        </div>
        {
          this.state.error && <div className="error">{this.state.error}</div>
        }
        {
          this.state.responseBody &&
          <div>
            <pre>
              {JSON.stringify(this.state.responseBody, null, 2)}
            </pre>
          </div>
        }

      </div>
    )
  }
}
