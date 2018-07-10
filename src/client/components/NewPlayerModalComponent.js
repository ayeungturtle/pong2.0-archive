import React, { Component } from 'react';
import { Modal, Button, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';

export class NewPlayerModalComponent extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleUserInput = this.handleUserInput.bind(this);
        this.clearState = this.clearState.bind(this);
        this.close = this.close.bind(this);
        this.validate = this.validate.bind(this);
        this.save = this.save.bind(this);
      
        this.state = {
            newPlayer: {
                firstName: null,
                lastName: null,
                nickName: null
            },
            validationState: {
                isValid: false,
                firstName: null,
                lastName: null,
                nickName: null
            }
        }
    }

    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            newPlayer:{
                ...this.state.newPlayer,
                [name]: value
            },
            validationState:{
                ...this.state.validationState,
                [name]: value.length < 3 ? 'error' : 'success'
            }
        });
    }

    close() {
        this.clearState();
        this.props.hideNewPlayerModal();
    }

    clearState() {
        this.setState({
            newPlayer: {
                firstName: null,
                lastName: null,
                nickName: null
            },
            validationState: {
                isValid: false,
                firstName: null,
                lastName: null,
                nickName: null
            }
        });
    }

    validate() {
        if (this.state.validationState.firstName === 'success' && this.state.validationState.lastName === 'success') {
            this.setState({validationState: {...this.state.validationState, isValid: true}});
            return true;
        }
        else {
            this.setState({
                validationState: {
                    ...this.state.validationState, 
                    isValid: false,
                    firstName: this.state.newPlayer.firstName == null || this.state.newPlayer.firstName.length < 3 ? 'error' : 'success',
                    lastName: this.state.newPlayer.lastName == null || this.state.newPlayer.lastName.length < 3 ? 'error' : 'success'
                },               
            });
            return false;
        }
    }

    save() {
        if (this.validate()) {
            this.props.saveNewPlayer(this.state.newPlayer);
            this.close();
        }
    }

    render() {
      return (
        <Modal show={this.props.newPlayerModal} >
        <Modal.Header >
            <h2 className="text-center">New Player</h2>
        </Modal.Header>
        <Modal.Body>
            <FormGroup validationState={this.state.validationState.firstName}>
                <ControlLabel>First Name</ControlLabel>
                <FormControl
                    id="firstNameField"
                    value={this.state.firstName}
                    name="firstName"
                    type="text"
                    label="First Name"
                    onChange={(event) => this.handleUserInput(event)}
                />
            </FormGroup>
            <FormGroup validationState={this.state.validationState.lastName}>
                <ControlLabel>Last Name</ControlLabel>                
                <FormControl
                    id="lastNameField"
                    value={this.state.lastName}                    
                    name="lastName"
                    type="text"
                    label="Last Name"
                    onChange={(event) => this.handleUserInput(event)}                    
                />
            </FormGroup>
            <FormGroup>
                <ControlLabel>Nick Name</ControlLabel>
                <FormControl
                    id="nickNameField"
                    value={this.state.nickName}                    
                    name="nickName"
                    type="text"
                    label="Nick Name"
                    onChange={(event) => this.handleUserInput(event)}                    
                />
            </FormGroup>
        </Modal.Body>
        <Modal.Footer>
            <Button className="pull-left" bsStyle="warning" bsSize="large" onClick={this.close}>Cancel</Button>
            <Button className="pull-right" bsStyle="success" bsSize="large" onClick={this.save}>Save</Button>
        </Modal.Footer> 
        </Modal>
      );
    }
}
  
