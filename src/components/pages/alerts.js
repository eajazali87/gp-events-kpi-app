
// src/components/pages/contacts.js
import React, { Component } from 'react';
import moment from 'moment';

const todaysDate = moment().format('YYYY-MM-DD');
const todaysDateMinus7 = moment().subtract(7,'days').format('YYYY-MM-DD');
const todaysDateMinus14 = moment().subtract(14,'days').format('YYYY-MM-DD');
const todaysDateMinus21 = moment().subtract(21,'days').format('YYYY-MM-DD');

const alertsThisWeekEndpoint = 'https://api.pagerduty.com/incidents?limit=100&since='+todaysDateMinus7+'&until='+todaysDate+'&team_ids%5B%5D=PS42LN4'
const alertsThisWeekMinus7Endpoint = 'https://api.pagerduty.com/incidents?limit=100&since='+todaysDateMinus14+'&until='+todaysDateMinus7+'&team_ids%5B%5D=PS42LN4'
const alertsThisWeekMinus14Endpoint = 'https://api.pagerduty.com/incidents?limit=100&since='+todaysDateMinus21+'&until='+todaysDateMinus14+'&team_ids%5B%5D=PS42LN4'

const token = 'Token xyz'

export default class Alerts extends Component {

  state = {
    alertsThisWeek: [],
    alertsThisMinus7: [],
    alertsThisMinus14: []
  }

  componentDidMount() {
    const options = {
      headers: new Headers({'content-type': 'application/json','Authorization':token}),
    };
    fetch(alertsThisWeekEndpoint, options)
    .then(res => res.json())
    .then((data) => {
      this.setState({ alertsThisWeek: data.incidents })
      console.log({alertsThisWeek: data})
    })
    .catch(console.log)

    fetch(alertsThisWeekMinus7Endpoint, options)
    .then(res => res.json())
    .then((data) => {
      this.setState({ alertsThisMinus7: data.incidents })
      console.log({alertsThisMinus7: data})
    })
    .catch(console.log)

    fetch(alertsThisWeekMinus14Endpoint, options)
    .then(res => res.json())
    .then((data) => {
      this.setState({ alertsThisMinus14: data.incidents })
      console.log({alertsThisMinus14: data})
    })
    .catch(console.log)
  }

  render () {
    return (
      <div>
      <center><h1>Segments Alerts</h1></center>
      <h3 id='title'>High Priority</h3>
      <table class="table">
      <thead class="thead-dark">
      <tr>
      <th scope="col">Start</th>
      <th scope="col">End</th>
      <th scope="col">Num. Alerts</th>
      <th scope="col">Auto-Resolved</th>
      </tr>
      </thead>
        <tbody>
          <tr>
          <td>{todaysDateMinus7}</td>
          <td>{todaysDate}</td>
          <td>{this.state.alertsThisWeek.length}</td>
          <td>Yes</td>
          </tr>
          <tr>
          <td>{todaysDateMinus14}</td>
          <td>{todaysDateMinus7}</td>
          <td>{this.state.alertsThisMinus7.length}</td>
          <td>Yes</td>
          </tr>
          <tr>
          <td>{todaysDateMinus21}</td>
          <td>{todaysDateMinus14}</td>
          <td>{this.state.alertsThisMinus14.length}</td>
          <td>Yes</td>
          </tr>
        </tbody>
      </table>
      </div>
    )
  }
}
