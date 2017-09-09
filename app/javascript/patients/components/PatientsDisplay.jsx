import React from 'react';
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import axios from 'axios'
import constants from './../common/constants'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import { Container, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import PropTypes from 'prop-types'

import Header from './Header'
// import PatientModal from './PatientModal'

class PatientsDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      patients: []
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    console.log('yes');
    this.setState({
      modal: !this.state.modal
    });
  }

  fetchPatients (id) {
    axios.get( `${constants.apiEndpoint}/patients/` )
        .then(response => {
          this.setState({
            patients : response.data.data
          })
          console.log(response);
        })
        .catch(error => {
          console.error(error);
        });
  }

  componentDidMount () {
    this.fetchPatients();
  }

  createPatient(){

  }

  buttonFormatter(cell, row){
    return(
      <div>
        <Button color="primary">Show</Button>{' '}
        <Button color="warning">Edit</Button>{' '}
        <Button color="danger">Destroy</Button>{' '}
      </div>
    )
  }

  onAfterInsertRow(row) {
    console.log(row);
  }

  createCustomButtonGroup = (props) => {
    return (
      <div>
      <ButtonGroup sizeClass='btn-group-md'>
        <Button color="primary" onClick={() => {this.toggle()}}>
          {/* <Icon name="download" />{' '} */}
          New Patient
        </Button>
      </ButtonGroup>
      <Modal isOpen={this.state.modal} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>
          Modal title
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="mrn">MRN</Label>
              <Input type="text" name="mrn" id="mrn" placeholder="MRN" />
              <Label for="f_name">First Name</Label>
              <Input type="text" name="f_name" id="f_name" placeholder="First Name" />
              <Label for="m_name">Middle Name</Label>
              <Input type="text" name="m_name" id="m_name" placeholder="Middle Name" />
              <Label for="l_name">Last Name</Label>
              <Input type="text" name="l_name" id="l_name" placeholder="Last Name" />
              <Label for="weight">Weight</Label>
              <Input type="text" name="weight" id="weight" placeholder="Weight" />
              <Label for="height">Height</Label>
              <Input type="text" name="height" id="height" placeholder="Height" />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
      </div>
    )
  }

  onRowClick = (row) => {
    this.props.actions.select(row.transaction)
  }

  render () {
    const options = {
      afterInsertRow: this.onAfterInsertRow,  // A hook for after insert rows
      btnGroup: this.createCustomButtonGroup,
      onRowClick: this.onRowClick
    };
    return (
      <div>
        <Header />
        <Container>
        <BootstrapTable data={this.state.patients} striped hover
                        options={ options }>
            <TableHeaderColumn isKey hidden dataField='id'>Patient ID</TableHeaderColumn>
            <TableHeaderColumn dataField='mrn'>MRN</TableHeaderColumn>
            <TableHeaderColumn dataField='first_name'>First Name</TableHeaderColumn>
            <TableHeaderColumn dataField='last_name'>Last Name</TableHeaderColumn>
            <TableHeaderColumn dataFormat={this.buttonFormatter}>Action</TableHeaderColumn>
            <TableHeaderColumn hidden dataField='weight'>Weight</TableHeaderColumn>
            <TableHeaderColumn hidden dataField='height'>Height</TableHeaderColumn>
        </BootstrapTable>
      </Container>
      </div>
    );
  }
}

export default PatientsDisplay;
