import React, {Component} from 'react';
import Alerts from './components/pages/alerts';

const alertsThisWeek = 'https://api.pagerduty.com/incidents?limit=100&since=2020-01-01&until=2020-01-30&team_ids%5B%5D=PW3RCMY'
const alertsThisWeekMinusOne = 'https://api.pagerduty.com/incidents?limit=100&since=2020-01-10&until=2020-01-28&team_ids%5B%5D=PW3RMY'
const alertsThisWeekMinusTwo = 'https://api.pagerduty.com/incidents?limit=100&since=2020-01-10&until=2020-01-28&team_ids%5B%5D=PW3RCMY'
const token = 'Token token=tTYpWTiYQymaL-Xwzo3H'

class App extends Component {
  state = {
    alerts: []
  }

  componentDidMount() {
    const options = {
      headers: new Headers({'content-type': 'application/json','Authorization':token}),
  };
    fetch(alertsThisWeek, options)
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
