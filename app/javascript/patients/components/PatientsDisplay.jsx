import React from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import constants from './../common/constants'

class PatientsDisplay extends React.Component {
  constructor () {
    super();
    this.state = {
      quote: {}
    };
  }

  fetchPatients (id) {
    axios.get( `${constants.apiEndpoint}/patients/` )
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
