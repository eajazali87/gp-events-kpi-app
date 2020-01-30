import React, {Component} from 'react';
import Alerts from './components/alerts';

class App extends Component {
  state = {
    alerts: [],
    pdutys: []
  }

  componentDidMount() {
    const options = {
      headers: new Headers({'content-type': 'application/json','Authorization':'Token token=XXXXXXX'}),
  };
    fetch('http://jsonplaceholder.typicode.com/users', options)
    .then(res => res.json())
    .then((data) => {
      this.setState({ alerts: data })
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