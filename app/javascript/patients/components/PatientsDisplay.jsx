import React from 'react';
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import axios from 'axios'
import constants from './../common/constants'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import { Container, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import { reduxForm, Field } from 'redux-form'
import { Alert } from 'reactstrap';

import Header from './Header'

const renderTextField = ({
  input,
  label,
}) =>
  <Input type="text" name={label} id={label} placeholder={label} {...input}/>

class PatientsDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      patients: [],
      visible: false
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
    this.setState({ visible: false });
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

  buttonFormatter(cell, row){
    return(
      <div>
        <Button color="primary">Show</Button>{' '}
        <Button color="warning">Edit</Button>{' '}
        <Button color="danger">Destroy</Button>{' '}
      </div>
    )
  }

 submit= (data) =>{
   axios.post( `${constants.apiEndpoint}/patients/`, data )
       .then(response => {
         if (response.status === 200) {
           var oldPatients = this.state.patients;
           var newPatients = oldPatients.concat(response.data.data);
            this.setState({
              patients : newPatients,
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
        <Button color="primary" onClick={() => {this.toggle()}}>
          <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>{' '}
          New Patient
        </Button>
      </ButtonGroup>
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} style={styles.modal}>
        <ModalHeader toggle={this.toggle}>
          New Patient
        </ModalHeader>
        <Form onSubmit={ handleSubmit(this.submit.bind(this)) }>
          <FormGroup>
            <ModalBody>
                  <Label for="mrn">MRN</Label>
                  <Field name="mrn" component={renderTextField} label="MRN" />
                  {/* <Input type="text" name="mrn" id="mrn" placeholder="MRN"/> */}
                  <Label for="f_name">First Name</Label>
                  <Field name="first_name" component={renderTextField} label="First Name" />
                  {/* <Input type="text" name="f_name" id="f_name" placeholder="First Name" /> */}
                  <Label for="m_name">Middle Name</Label>
                  <Field name="middle_name" component={renderTextField} label="Middle Name" />
                  {/* <Input type="text" name="m_name" id="m_name" placeholder="Middle Name" /> */}
                  <Label for="l_name">Last Name</Label>
                  <Field name="last_name" component={renderTextField} label="Last Name" />
                  {/* <Input type="text" name="l_name" id="l_name" placeholder="Last Name" /> */}
                  <Label for="weight">Weight</Label>
                  <Field name="weight" component={renderTextField} label="Weight" />
                  {/* <Input type="text" name="weight" id="weight" placeholder="Weight" /> */}
                  <Label for="height">Height</Label>
                  <Field name="height" component={renderTextField} label="Height" />
                  {/* <Input type="text" name="height" id="height" placeholder="Height" /> */}
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

  render () {
    const options = {
      afterInsertRow: this.onAfterInsertRow,  // A hook for after insert rows
      btnGroup: this.createCustomButtonGroup,
      onRowClick: this.onRowClick
    };
    return (
      <div>
        <Header />
        {
          this.state.visible ?
          <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
            New Patient added!
          </Alert> :
          null
        }
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

const mapStateToProps = (state, ownProps) => {
  console.log(state); // state
  console.log(ownProps); // ownProps
}

export default reduxForm({
  form: 'PatientsDisplay'
})(PatientsDisplay);
