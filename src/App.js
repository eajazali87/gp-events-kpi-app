import React, {Component} from 'react';
import Alerts from './components/alerts';

class App extends Component {
  state = {
    alerts: []
  }

  componentDidMount() {
    const options = {
      headers: new Headers({'content-type': 'application/json','Authorization':'Token token=tTYpWTiYQymaL-Xwzo3H'}),
  };
    fetch('https://api.pagerduty.com/teams/PS42LN4', options)
    .then(res => res.json())
    .then((data) => {
      this.setState({ alerts: data })
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