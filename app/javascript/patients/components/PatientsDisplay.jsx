import React from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';

class PatientsDisplay extends React.Component {
  constructor () {
    super();
    this.state = {
    };
  }

  componentDidMount () {

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
