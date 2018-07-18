import React, { Component } from 'react';
import { Alert, Modal, Button, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';

export class AlertComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        
        this.state = {
            alertTypes: {
                noAlert: 0,
                newPlayerSaveSuccess: 1,
                newPlayerSaveFailure: 2,
                gameSaveSuccess: 3,
                gameSaveFailure: 4
            }
        };
    }
  
    render() {
        switch(this.props.alertType) {
            case this.state.alertTypes.newPlayerSaveSuccess:
                return (
                    <Alert bsStyle="success" className="alert-bottom" onDismiss={this.props.dismissAlert}>
                        {"New player saved: " + this.props.newPlayer.firstName + " " + this.props.newPlayer.lastName}
                    </Alert>
                );
                break;
            case this.state.alertTypes.newPlayerSaveFailure:
                return (
                    <Alert bsStyle="danger" className="alert-bottom" onDismiss={this.props.dismissAlert}>
                       New player failed to save.
                    </Alert>
                );
                break;
            case this.state.alertTypes.gameSaveSuccess:
                return (
                    <Alert bsStyle="success" className="alert-bottom" onDismiss={this.props.dismissAlert}>
                        { "Game saved: " + this.props.lastGameSaved }
                    </Alert>
                );
                break;
            case this.state.alertTypes.gameSaveFailure:
                return (
                    <Alert bsStyle="danger" className="alert-bottom" onDismiss={this.props.dismissAlert}>
                       Game failed to save.
                    </Alert>
                );
                break;
            default:
                return null;
        }
    }
}
