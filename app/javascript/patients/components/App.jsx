import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import PatientsDisplay from './PatientsDisplay'
import PatientDetails from './PatientDetails';
import EncounterDetails from './EncounterDetails';

const App = (props) => (
  <Router>
    <div>
      <Route
        exact path='/'
        component={PatientsDisplay}
      />
      <Route exact path='/patients/:number' component={PatientDetails} />
      <Route exact path='/patients/:number/encounters/:encounterId' component={EncounterDetails} />
    </div>
  </Router>
)

// You will need this on the bottom of each component file
// to make it available through ES6 'import' statements.

export default App
