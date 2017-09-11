import React from 'react';
import { Link } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Row, Col, Table, Alert } from 'reactstrap';
import constants from './../common/constants'
import axios from 'axios'
import { reduxForm, Field } from 'redux-form'
import Loading from 'react-loading-animation'

import Header from './Header'
var patientDetails;

const renderTextField = ({
  input,
  label,
}) =>
  <Input type="text" name={label} id={label} placeholder={label} {...input}/>

class PatientDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patientId: null,
      patientEncounters: null,
      patientDetails: null,
      modal: false,
      visible: false,
      deleteEncounter: false,
      isLoadingPatient: true,
      isLoadingEncounter: true
    };

    this.toggle = this.toggle.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  onDismiss() {
    this.setState({
      visible: false,
      deleteEncounter: false
   });
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
            patientDetails : response.data.data,
            isLoadingPatient: false
          })
          // console.log(response);
        })
        .catch(error => {
          console.error(error);
        });
  }

  fetchEncounters (id) {
    axios.get( `${constants.apiEndpoint}/patients/${id}/encounters/` )
        .then(response => {
          this.setState({
            patientEncounters : response.data.data,
            isLoadingEncounter: false
          })
          // console.log(response);
        })
        .catch(error => {
          console.error(error);
        });
  }

  handleClick = (e, row) => {
    e.preventDefault();
    this.delete(row);
  }

  delete= (row) => {
    let encounterId = row.id;
    axios.delete( `${constants.apiEndpoint}/patients/${this.state.patientId}/encounters/${encounterId}` )
        .then(response => {
          if (response.status === 200) {
            let newPatientEncounters = this.state.patientEncounters;
            let index = newPatientEncounters.indexOf(row);
            newPatientEncounters.splice(index,1);
             this.setState({
               patientEncounters : newPatientEncounters,
               deleteEncounter: true
             })
          }
          // console.log(response);
        })
        .catch(error => {
          console.error(error);
        });
  }

  buttonFormatter(cell, row){
    return(
      <div>
        <Link to={`/patients/${this.state.patientId}/encounters/${row.id}`}><Button color="primary">Show</Button></Link>{' '}
        <Button color="warning">Edit</Button>{' '}
        <Button color="danger" onClick={(e) => this.handleClick(e, row)}>Destroy</Button>{' '}
      </div>
    )
  }

  submit= (data) =>{
    data.patient_id = this.state.patientId;
    axios.post( `${constants.apiEndpoint}/patients/${this.state.patientId}/encounters`, data )
        .then(response => {
          if (response.status === 200) {
            var oldPatientEncounters = this.state.patientEncounters;
            var newPatientEncounters = oldPatientEncounters.concat(response.data.data);
             this.setState({
               patientEncounters : newPatientEncounters,
               visible: true
             })
             this.toggle();
          }
        })
        .catch(error => {
          console.error(error);
        });
  }

  createCustomButtonGroup = (props) => {
    const { handleSubmit } = this.props;
    return (
      <div>
      <ButtonGroup sizeClass='btn-group-md'>
        <Button color="info" onClick={() => {this.toggle()}}>
          <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>{' '}
          New Encounter
        </Button>
      </ButtonGroup>
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} style={styles.modal}>
        <ModalHeader toggle={this.toggle}>
          New Encounter
        </ModalHeader>
        <Form onSubmit={ handleSubmit(this.submit.bind(this)) }>
          <FormGroup>
            <ModalBody>
                  <Label for="visit_number">Visit Number</Label>
                  <Field name="visit_number" component={renderTextField} label="Visit Number" />
                  {/* <Input type="text" name="mrn" id="mrn" placeholder="MRN"/> */}
                  <Label for="admitted_at">Admitted At</Label>
                  <Field name="admitted_at" component={renderTextField} label="Admitted At" />
                  {/* <Input type="text" name="f_name" id="f_name" placeholder="First Name" /> */}
                  <Label for="location">Location</Label>
                  <Field name="location" component={renderTextField} label="Location" />
                  {/* <Input type="text" name="m_name" id="m_name" placeholder="Middle Name" /> */}
                  <Label for="room">Room</Label>
                  <Field name="room" component={renderTextField} label="Room" />
                  {/* <Input type="text" name="l_name" id="l_name" placeholder="Last Name" /> */}
                  <Label for="bed">Bed</Label>
                  <Field name="bed" component={renderTextField} label="Bed" />
                  {/* <Input type="text" name="weight" id="weight" placeholder="Weight" /> */}
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">Add</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </FormGroup>
        </Form>
      </Modal>
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
        <Link to={'/'}><Button color="link">Back</Button></Link>{' '}
        {
          this.state.visible ?
          <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
            New Encounter added!
          </Alert> :
          null
        }
        {
          this.state.deleteEncounter ?
          <Alert color="success" isOpen={this.state.deletePatient} toggle={this.onDismiss}>
            Encounter deleted!
          </Alert> :
          null
        }
        {
          this.state.isLoadingPatient && this.state.isLoadingEncounter ?
          <Loading /> :
          <div>
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
        }
      </div>
    );
  }
}

const styles={
  modal:{
    display: 'block',
    paddingRight: '17px',
    marginTop: '200px'
  }
};

export default reduxForm({
  form: 'PatientDetails'
})(PatientDetails);
