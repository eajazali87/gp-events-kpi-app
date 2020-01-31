import React, {Component} from 'react';
import Alerts from './components/pages/alerts';

const alertsPerWeek = 'https://api.pagerduty.com/incidents?limit=100&since=2020-01-10&until=2020-01-28&team_ids%5B%5D=PS42LN4'
const token = 'Token xyz'

class App extends Component {
  state = {
    alertsForCurrentWeek: []
  }

  componentDidMount() {
    const options = {
      headers: new Headers({'content-type': 'application/json','Authorization':token}),
  };
    fetch(alertsPerWeek, options)
    .then(res => res.json())
    .then((data) => {
      this.setState({ alerts: data.incidents })
      console.log({alerts: data})
    })
    .catch(console.log)
  }

  render () {
    return (
      <Alerts alerts={this.state.alerts} />
    )
  }
}

export default App;
