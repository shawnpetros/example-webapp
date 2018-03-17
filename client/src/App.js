import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const style = {
  container: {
    marginTop: 30,
  },
  form: {
    width: '50%',
    margin: 'auto',
  },
  submit: {
    marginRight: 10,
  }
};

class App extends Component {
  state = {
    result: null,
    todo: '',
    todos: [],
  };

  componentWillMount() {
    this.get();
  }

  get() {
    this.callApi('get')
      .then(res => this.setState({ todos: res }))
      .catch(err => console.log(err));
  }

  post(evt) {
    evt.preventDefault();
    this.callApi('post')
      .then((result) => {
        this.get();
        this.setState({ result, todo: '' });
      })
      .catch(err => console.log(err));
  }

  delete(evt) {
    evt.preventDefault();
    this.callApi('delete')
      .then((result) => {
        this.get();
        this.setState({ result, todo: '' });
      })
      .catch(err => console.log(err));
  }

  handleChange(evt) {
    evt.preventDefault();
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
          body: JSON.stringify({ todo: this.state.todo }),
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
        });
        body = await response.json();
        break;
      case 'delete':
        response = await fetch('/api/data', {
          method: 'DELETE',
        });
        body = await response.json();
        break;
      default:
        response = await fetch('/api/data');
        body = await response.json();
        break;
    }

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  makeToDo(item) {
    return <div className="uk-alert uk-margin" key={ item._id }>{ item.todo }</div>
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
          <div style={ style.container }>
            <div className="todos">
              { this.state.todos.map(this.makeToDo) }
            </div>
            <form style={ style.form }>
              <fieldset className="uk-fieldset">
                <legend className="uk-legend">A cool example ToDo App</legend>
                <div className="uk-margin">
                  <input className="uk-input" type="text" name="todo" placeholder="get milk from store" value={this.state.todo} onInput={evt => this.handleChange(evt)} />
                </div>
                <button className="uk-button uk-button-primary" style={ style.submit } onClick={evt => this.post(evt)} >ADD</button>
                <button className="uk-button uk-button-secondary" onClick={evt => this.delete(evt)} >DROP</button>
              </fieldset>
            </form>
          </div>
      </div>
    );
  }
}

export default App;
