import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import PatientsDisplay from './PatientsDisplay'
import PatientDetails from './PatientDetails';

const App = (props) => (
  <Router>
    <div>
      <Route
        exact path='/'
        component={PatientsDisplay}
      />
      <Route path='/patients/:number' component={PatientDetails} />
    </div>
  </Router>
)

// You will need this on the bottom of each component file
// to make it available through ES6 'import' statements.

export default App
