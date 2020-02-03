
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

const options = {
  headers: new Headers({'content-type': 'application/json','Authorization':token}),
};

export default class Alerts extends Component {
  state = {
    alertsThisWeek: [],
    highAlertsThisWeek: '',
    lowAlertsThisWeek: '',
    alertsThisWeekMinusOne: [],
    highAlertsThisWeekMinusOne: '',
    lowAlertsThisWeekMinusOne: '',
    alertsThisWeekMinusTwo: [],
    highAlertsThisWeekMinusTwo: '',
    lowAlertsThisWeekMinusTwo: '',
  }

  componentDidMount() {
    fetch(alertsThisWeekEndpoint, options)
    .then(res => res.json())
    .then((data) => {
      var highAlerts = data.incidents.filter(x => x.urgency === "high");
      var lowAlerts = data.incidents.filter(x => x.urgency === "low");
      this.setState({ alertsThisWeek: data.incidents, highAlertsThisWeek: highAlerts.length, lowAlertsThisWeek: lowAlerts.length })
    })
    .catch(console.log)

    fetch(alertsThisWeekMinusOneEndpoint, options)
    .then(res => res.json())
    .then((data) => {
      var highAlerts = data.incidents.filter(x => x.urgency === "high");
      var lowAlerts = data.incidents.filter(x => x.urgency === "low");
      this.setState({ alertsThisWeekMinusOne: data.incidents, highAlertsThisWeekMinusOne: highAlerts.length, lowAlertsThisWeekMinusOne: lowAlerts.length })
    })
    .catch(console.log)

    fetch(alertsThisWeekMinusTwoEndpoint, options)
    .then(res => res.json())
    .then((data) => {
      var highAlerts = data.incidents.filter(x => x.urgency === "high");
      var lowAlerts = data.incidents.filter(x => x.urgency === "low");
      this.setState({ alertsThisWeekMinusTwo: data.incidents, highAlertsThisWeekMinusTwo: highAlerts.length, lowAlertsThisWeekMinusTwo: lowAlerts.length })
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
      <th scope="col">High Alerts</th>
      <th scope="col">Low Alerts</th>
      <th scope="col">Auto-Resolved</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td>{todaysDateMinusOne}</td>
      <td>{todaysDate}</td>
      <td>{this.state.alertsThisWeek.length}</td>
      <td>{this.state.highAlertsThisWeek}</td>
      <td>{this.state.lowAlertsThisWeek}</td>
      <td>Yes</td>
      </tr>
      <tr>
      <td>{todaysDateMinusTwo}</td>
      <td>{todaysDateMinusOne}</td>
      <td>{this.state.alertsThisWeekMinusOne.length}</td>
      <td>{this.state.highAlertsThisWeekMinusOne}</td>
      <td>{this.state.lowAlertsThisWeekMinusOne}</td>
      <td>Yes</td>
      </tr>
      <tr>
      <td>{todaysDateMinusThree}</td>
      <td>{todaysDateMinusTwo}</td>
      <td>{this.state.alertsThisWeekMinusTwo.length}</td>
      <td>{this.state.highAlertsThisWeekMinusTwo}</td>
      <td>{this.state.lowAlertsThisWeekMinusTwo}</td>
      <td>Yes</td>
      </tr>
      </tbody>
      </table>


      </div>
    )
  }
}
