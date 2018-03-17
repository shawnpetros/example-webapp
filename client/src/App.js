import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const style = {
  form: {
    width: '50%',
    margin: 'auto',
  },
};

class App extends Component {
  state = {
    hello: '',
    result: null,
    data: '',
    method: 'post',
    get: false,
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ hello: res.express }))
      .catch(err => console.log(err));
  }

  handleClick(evt) {
    evt.preventDefault();
    console.log(this.state);
    this.callApi(this.state.method)
      .then(res => this.setState({ get: true, result: res }))
      .catch(err => console.log(err));
  }

  handleChange(evt) {
    if (evt.target.name !== 'method') {
      evt.preventDefault();
    }
    this.setState({ [evt.target.name]: evt.target.value });
  }

  callApi = async (method) => {
    let response, body;
    switch(method) {
      case 'get':
        response = await fetch('/api/data');
        body = await response.json();
        break;
      case 'post':
        response = await fetch('/api/data', {
          method: 'POST',
          body: JSON.stringify({ data: this.state.data }),
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
        });
        body = await response.json();
        break;
      default:
        response = await fetch('/api/hello');
        body = await response.json();
        break;
    }

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {
          this.state.get ? <p>Data from DB!</p> :
          <div>
            <p className="App-intro">{ this.state.hello }</p>
            <form style={ style.form }>
              <fieldset className="uk-fieldset">
                <legend className="uk-legend">POST/GET from DB</legend>
                <div className="uk-margin">
                  <input className="uk-input" type="text" name="data" placeholder="some data for the db" onInput={evt => this.handleChange(evt)} />
                </div>
                <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                  <label><input className="uk-radio" type="radio" name="method" value="post" onChange={evt => this.handleChange(evt)} checked={this.state.method === 'post'} /> POST</label>
                  <label><input className="uk-radio" type="radio" name="method" value="get" onChange={evt => this.handleChange(evt)} checked={this.state.method === 'get'} /> GET</label>
                </div>
                <button className="uk-button uk-button-primary" style={ style.submit } onClick={evt => this.handleClick(evt)} >SUBMIT</button>
              </fieldset>
            </form>
          </div>
        }
      </div>
    );
  }
}

export default App;
