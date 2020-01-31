
// src/components/pages/contacts.js

import React from 'react'

// const Alerts = ({ alerts }) => {
//   return (
//     <div>
//       <center><h1>Segments Alerts</h1></center>
//       {
//         alerts.map((alert) => (
//         <div class="card-body">
//         <p class="card-text">{alert.incident_number}</p>
//
//         <h3 id='title'>High Priority</h3>
//         <tr>
//            <td>{alerts.length}</td>
//         </tr>
//         </div>
//         ))
//       }
//       </div>
//   )
// };

const Alerts = ({ alerts }) => {
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
            <td>1/20</td>
            <td>{alerts.length}</td>
            <td>1/30</td>
            <td>Yes</td>
          </tr>
        </tbody>
      </table>
    </div>
  )

}
export default Alerts


//HIGH Priority
//alerts.startDate
//alerts.endDate
//alerts.length
//alerts.autoResolved

//LOW Priority
//alerts.startDate
//alerts.endDate
//alerts.length
//alerts.autoResolved
