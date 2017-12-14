import React from 'react'
import client from '../api/client'
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
    editor_is_visible: false
  }

  componentDidMount() {
     this.setState({
         editor_is_visible: true
     })
  }

  handleQueryChange = query => {
    this.setState({query});
  }

  handleQueryFire = async () => {
    const responseBody = await client.search(JSON.parse(this.state.query));
    this.setState({responseBody});
  }

  render() {
    return (
      <div>
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
        <div>
          <pre>
            {JSON.stringify(this.state.responseBody, null, 2)}
          </pre>
        </div>
      </div>
    )
  }
}
