import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
  state = {
    name: 'React Blitz',
  }

  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <p>Start editing to see some magic happend.</p>
      </div>
    );
  }
}

export default App;
