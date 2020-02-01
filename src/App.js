import React, {Component} from 'react';
import Alerts from './components/pages/alerts';
import AWS from './components/pages/awscosts';
import {BrowserRouter, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path='/alerts' render={() => (
            <div className="App">
              <Alerts />
            </div>
          )}/>
        </div>
        <div>
          <Route exact={true} path='/aws' render={() => (
            <div className="App">
              <AWS />
            </div>
          )}/>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
