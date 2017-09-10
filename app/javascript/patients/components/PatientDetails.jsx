import React from 'react';
import { Link } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Row, Col, Table } from 'reactstrap';
import constants from './../common/constants'
import axios from 'axios'

import Header from './Header'
var patientDetails;
class PatientDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patientId: null,
      patientEncounters: null,
      patientDetails: null
    };
  }

  componentWillMount () {
    patientDetails= [];
    let patientId = this.props.match.params.number;
    this.fetchPatient(patientId);
    this.fetchEncounters(patientId);
    this.setState({
      patientId
    });
  }

  fetchPatient (id) {
    axios.get( `${constants.apiEndpoint}/patients/${id}` )
        .then(response => {
          patientDetails = response.data.data;
          this.setState({
            patientDetails : response.data.data
          })
          console.log(response);
        })
        .catch(error => {
          console.error(error);
        });
  }

  fetchEncounters (id) {
    axios.get( `${constants.apiEndpoint}/patients/${id}/encounters/` )
        .then(response => {
          this.setState({
            patientEncounters : response.data.data
          })
          console.log(response);
        })
        .catch(error => {
          console.error(error);
        });
  }

  buttonFormatter(cell, row){
    return(
      <div>
        <Link to={`/patients/${row.id}`}><Button color="primary">Show</Button></Link>{' '}
        <Button color="warning">Edit</Button>{' '}
        <Button color="danger" onClick={(e) => this.handleClick(e, row)}>Destroy</Button>{' '}
      </div>
    )
  }

  render() {
    const options = {
      btnGroup: this.createCustomButtonGroup,
    };
    return (
      <div>
        <Header />
        <Button color="link">Back</Button>{' '}
        <Form>
          <Row>
            <Col>
              <center><h1>Patient Details</h1></center>
            </Col>
          </Row>
          <Row>
            <Col xs="6">
              <FormGroup>
                <Label for="patientid">Patient Id</Label>
                  <Input static>{patientDetails.id}</Input>
              </FormGroup>
            </Col>
            <Col xs="6">
              <FormGroup>
                <Label for="name">Name</Label>
                <Input static>{patientDetails.first_name} {patientDetails.middle_name} {patientDetails.last_name} </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
              <Col xs="6">
                <FormGroup>
                  <Label for="weight">Weight</Label>
                  <Input static>{patientDetails.weight}</Input>
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label for="height">Height</Label>
                  <Input static>{patientDetails.height} </Input>
                </FormGroup>
              </Col>
          </Row>
        </Form>

        <BootstrapTable data={this.state.patientEncounters} striped hover
                        options={ options }>
            <TableHeaderColumn isKey hidden dataField='id'>Encounter ID</TableHeaderColumn>
            <TableHeaderColumn dataField='visit_number'>Visit Number</TableHeaderColumn>
            <TableHeaderColumn dataField='admitted_at'>Admitted At</TableHeaderColumn>
            <TableHeaderColumn dataField='discharged_at'>Discharged At</TableHeaderColumn>
            <TableHeaderColumn dataFormat={this.buttonFormatter.bind(this)}>Action</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default PatientDetails;
