import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

export class NewPlayerModalComponent extends React.Component {
    constructor(props, context) {
      super(props, context);
    }

    render() {
      return (
        <Modal show={this.props.newPlayerModal} >
        <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>Text in a modal</h4>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={this.props.hideNewPlayerModal}>Close</Button>
        </Modal.Footer> 
        </Modal>
      );
    }
}
  
