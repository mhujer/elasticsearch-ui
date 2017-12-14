import React from 'react'
import client from '../api/client';
import CustomHead from '../components/Header'
import Editor from '../components/Editor'
import Menu from '../components/Menu';
//import ReactJson from 'react-json-view'
let ReactJson = null

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
    ReactJson = require('react-json-view').default
    this.setState({
      editor_is_visible: true
    })
  }

  handleQueryChange = query => {
    this.setState({query});
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
        <div className="container-fluid">
          <Menu active="query"/>
          <div className="row">

            <div className="col-6">
              {this.state.editor_is_visible && <Editor
                mode="json"
                theme="github"
                value={this.state.query}
                onChange={this.handleQueryChange}
                maxLines={15}
              />}
              <br/>
              <button onClick={this.handleQueryFire} className="btn btn-success">Query!</button>
            </div>
            <div className="col-6" style={{overflowY: 'scroll', maxHeight: '500px'}}>
              {
                this.state.error && <div className="error">{this.state.error}</div>
              }
              {
                ReactJson && this.state.editor_is_visible && this.state.responseBody &&
                <div>
                  <ReactJson src={this.state.responseBody} />
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
