import React from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';

class PatientsDisplay extends React.Component {
  constructor () {
    super();
    this.state = {
      quote: {}
    };
  }

  fetchPatients (id) {
    axios.get( `http://localhost:3000/api/v1/patients/` )
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error(error);
        });
  }

  componentDidMount () {
    this.fetchPatients();
  }

  componentWillReceiveProps (nextProps) {

  }

  render () {

    return (
      <div>
        <h1> Hi patients </h1>
      </div>
    );
  }
}

export default PatientsDisplay;
