import React, {Component} from 'react';
import Alerts from './components/pages/alerts';
import {BrowserRouter, Route} from 'react-router-dom';

const alertsPerWeek = 'https://api.pagerduty.com/incidents?limit=100&since=2020-01-10&until=2020-01-28&team_ids%5B%5D=PS42LN4'
const token = 'Token xyz'

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
      </BrowserRouter>
    );
  }
}
export default App;
