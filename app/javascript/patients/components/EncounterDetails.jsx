import React from 'react';
import { Link } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Row, Col } from 'reactstrap';
import axios from 'axios'
import constants from './../common/constants'

import Header from './Header'
var encounterDetails;
class EncounterDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patientId: null,
      encounterId: null,
      encounterDetails: null
    };
  }

  componentWillMount () {
    encounterDetails= [];
    let patientId = this.props.match.params.number;
    let encounterId = this.props.match.params.encounterId;
    this.fetchEncounter(patientId,encounterId);
    this.setState({
      patientId,
      encounterId
    });
  }

  fetchEncounter (patientId, encounterId) {
    axios.get( `${constants.apiEndpoint}/patients/${patientId}/encounters/${encounterId}` )
        .then(response => {
          encounterDetails = response.data.data;
          this.setState({
            encounterDetails : response.data.data
          })
          console.log(response);
        })
        .catch(error => {
          console.error(error);
        });
  }

  render() {
    return (
      <div>
        <Header />
        <Link to={`/patients/${this.state.patientId}`}><Button color="link">Back</Button></Link>{' '}
        <Form>
          <Row>
            <Col>
              <center><h1>Encounter Details</h1></center>
            </Col>
          </Row>
          <Row>
            <Col xs="6">
              <FormGroup>
                <Label for="encounterid">Encounter Id</Label>
                  <Input static>{encounterDetails.id}</Input>
              </FormGroup>
            </Col>
            <Col xs="6">
              <FormGroup>
                <Label for="patientid">Patient Id</Label>
                <Input static>{encounterDetails.patient_id} </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
              <Col xs="6">
                <FormGroup>
                  <Label for="visit_number">Visit Number</Label>
                  <Input static>{encounterDetails.visit_number}</Input>
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label for="location">Location</Label>
                  <Input static>{encounterDetails.location} </Input>
                </FormGroup>
              </Col>
          </Row>
          <Row>
              <Col xs="6">
                <FormGroup>
                  <Label for="room">Room</Label>
                  <Input static>{encounterDetails.room}</Input>
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label for="bed">Bed</Label>
                  <Input static>{encounterDetails.bed} </Input>
                </FormGroup>
              </Col>
          </Row>
          <Row>
              <Col xs="6">
                <FormGroup>
                  <Label for="admitted_at">Admitted At</Label>
                  <Input static>{encounterDetails.admitted_at}</Input>
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label for="discharged_at">Discharged At</Label>
                  <Input static>{encounterDetails.discharged_at} </Input>
                </FormGroup>
              </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default EncounterDetails;
