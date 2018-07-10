import React, { Component } from 'react';
import { Alert, Modal, Button, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';

export class PingKingComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        
        this.state = {
            alertTypes: {
                noAlert: 0,
                newPlayerSaveSucess: 1,
                newPlayerSaveFailure: 2,
            }
        };
    }
  
    render() {
        return (
            <div>helloman</div>
        )
    }
}