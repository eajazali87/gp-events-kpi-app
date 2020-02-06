
// src/components/pages/contacts.js
import React, { Component } from 'react';
import moment from 'moment';
import {Line, Doughnut,Bar,HorizontalBar, Pie} from 'react-chartjs-2';

const todaysDate = moment().format('YYYY-MM-DD');
const todaysDateMinusOne = moment().subtract(7,'days').format('YYYY-MM-DD');
const todaysDateMinusTwo = moment().subtract(14,'days').format('YYYY-MM-DD');
const todaysDateMinusThree = moment().subtract(21,'days').format('YYYY-MM-DD');
const teamId = 'PS42LN4'

const alertsThisWeekEndpoint = 'https://api.pagerduty.com/incidents?limit=100&since='+todaysDateMinusOne+'&until='+todaysDate+'&team_ids%5B%5D='+teamId
const alertsThisWeekMinusOneEndpoint = 'https://api.pagerduty.com/incidents?limit=100&since='+todaysDateMinusTwo+'&until='+todaysDateMinusOne+'&team_ids%5B%5D='+teamId
const alertsThisWeekMinusTwoEndpoint = 'https://api.pagerduty.com/incidents?limit=100&since='+todaysDateMinusThree+'&until='+todaysDateMinusTwo+'&team_ids%5B%5D='+teamId

const token = 'Token token=xyz'

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
    lowAlertsThisWeekMinusTwo: ''
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
    const chartData = {
      labels: [todaysDateMinusTwo, todaysDateMinusOne, moment().format('YYYY-MM-DD')],
      datasets: [
        {
          label: 'Low',
          fill: false,
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 3,
          data: [this.state.lowAlertsThisWeekMinusTwo,this.state.lowAlertsThisWeekMinusOne, this.state.lowAlertsThisWeek]
        },
        {
          label: 'High',
          fill: false,
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 3,
          data: [this.state.highAlertsThisWeekMinusTwo,this.state.highAlertsThisWeekMinusOne, this.state.highAlertsThisWeek]
        }
      ]
    }

    return (
      <div>
      <center><h1>Segments Alerts</h1></center>
      <h3 id='title'>Alerts Per Week</h3>
      <table class="table">
      <thead class="thead-dark">
      <tr>
      <th scope="col">Start</th>
      <th scope="col">End</th>
      <th scope="col">Num. Alerts</th>
      <th scope="col">High Alerts</th>
      <th scope="col">Low Alerts</th>
      <th scope="col">Resolved</th>
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
      <div>
      <Line
      data={chartData}
      width={300}
      height={400}
      options={{
        title:{
          display:true,
          text:'Alerts trend',
          fontSize:20
        },
        legend:{
          display:true,
          position:'right'
        }
      },
      { maintainAspectRatio: false }}
      />
      </div>
      </div>
    )
  }
}
