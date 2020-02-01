
// src/components/pages/contacts.js
import React, { Component } from 'react';
import moment from 'moment';

const todaysDate = moment().format('YYYY-MM-DD');
const todaysDateMinusOne = moment().subtract(7,'days').format('YYYY-MM-DD');
const todaysDateMinusTwo = moment().subtract(14,'days').format('YYYY-MM-DD');
const todaysDateMinusThree = moment().subtract(21,'days').format('YYYY-MM-DD');
const teamId = 'PDZPWAT'

const alertsThisWeekEndpoint = 'https://api.pagerduty.com/incidents?limit=100&since='+todaysDateMinusOne+'&until='+todaysDate+'&team_ids%5B%5D='+teamId
const alertsThisWeekMinusOneEndpoint = 'https://api.pagerduty.com/incidents?limit=100&since='+todaysDateMinusTwo+'&until='+todaysDateMinusOne+'&team_ids%5B%5D='+teamId
const alertsThisWeekMinusTwoEndpoint = 'https://api.pagerduty.com/incidents?limit=100&since='+todaysDateMinusThree+'&until='+todaysDateMinusTwo+'&team_ids%5B%5D='+teamId

const token = 'Token xyz'

export default class Alerts extends Component {

  state = {
    alertsThisWeek: [],
    alertsThisMinusOne: [],
    alertsThisMinusTwo: []
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

    fetch(alertsThisWeekMinusOneEndpoint, options)
    .then(res => res.json())
    .then((data) => {
      this.setState({ alertsThisMinusOne: data.incidents })
      console.log({alertsThisMinusOne: data})
    })
    .catch(console.log)

    fetch(alertsThisWeekMinusTwoEndpoint, options)
    .then(res => res.json())
    .then((data) => {
      this.setState({ alertsThisMinusTwo: data.incidents })
      console.log({alertsThisMinusTwo: data})
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
          <td>{todaysDateMinusOne}</td>
          <td>{todaysDate}</td>
          <td>{this.state.alertsThisWeek.length}</td>
          <td>Yes</td>
          </tr>
          <tr>
          <td>{todaysDateMinusTwo}</td>
          <td>{todaysDateMinusOne}</td>
          <td>{this.state.alertsThisMinusOne.length}</td>
          <td>Yes</td>
          </tr>
          <tr>
          <td>{todaysDateMinusThree}</td>
          <td>{todaysDateMinusTwo}</td>
          <td>{this.state.alertsThisMinusTwo.length}</td>
          <td>Yes</td>
          </tr>
        </tbody>
      </table>
      </div>
    )
  }
}
