import React from 'react'
import client from '../api/client';
import CustomHead from '../components/Header'
import Editor from '../components/Editor'

export default class Query extends React.Component {

  state = {
    query: '{\n' +
    '\t"index": "price-offers",\n' +
    '\t"body": {\n' +
    '\n' +
    '\t}\n' +
    '}',
    responseBody: '',
    error: null,
    editor_is_visible: false
  }

  componentDidMount() {
    this.setState({
      editor_is_visible: true
    })
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
        <CustomHead/>
        <div className="container container-responsive">

          <div>
            {this.state.editor_is_visible && <Editor
              mode="json"
              theme="github"
              value={this.state.query}
              onChange={this.handleQueryChange}
              maxLines={15}
            />}
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
      </div>
    )
  }
}
