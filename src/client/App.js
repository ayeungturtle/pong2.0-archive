import React, { Component } from 'react';
import { FormControl, FormGroup, Row, Col, Button, ControlLabel, HelpBlock } from 'react-bootstrap';
import { NewPlayerModalComponent } from './components/NewPlayerModalComponent';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.showNewPlayerModal = this.showNewPlayerModal.bind(this);
    this.hideNewPlayerModal = this.hideNewPlayerModal.bind(this);

    this.state = { 
      newPlayerModal: false
    };
  }

  componentDidMount() {

  }

  showNewPlayerModal() {
    this.setState({ newPlayerModal: true });
  }

  hideNewPlayerModal() {
    this.setState({ newPlayerModal: false });
  }

  render() {
    return (
      <Row>
        <Col md={11}>
        main app
        </Col>
        <Col md={1}>
          <Button bsStyle="primary" bsSize="large" onClick={this.showNewPlayerModal}>
            New Player
          </Button>        
        </Col>
        <NewPlayerModalComponent 
          newPlayerModal={this.state.newPlayerModal}
          hideNewPlayerModal={this.hideNewPlayerModal}
        />
      </Row>
    );
  }
}


// constructor(props) {
//   super(props);
//   this.state = { 
//     username: null,
//     newUser: 'yaman',
//     test: null
//   };
// }

// componentDidMount() {
//   fetch('/api/getUsername')
//     .then(res => res.json())
//     .then(user => this.setState({ username: user.username }));
    
//   fetch('api/players', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify ({
//       firstName: "Andy",
//       lastName: "Yeung"
//     })
//   })
//   .then(res => res.json())
//   .then(userString => this.setState({ newUser: userString.string}));

//   fetch('/api/test')
//   .then( res => res.json())
//   .then( test => this.setState({ test: test.playerId1}))
// }

// render() {
//   return (
//     <Row>
//       <Col md={6}>
//         {this.state.username ? (
//           <h1>Hello {this.state.username}</h1>
//         ) : (
//           <h1>Loading.. please wait!</h1>
//         )}
//       </Col>
//       <Col md={2}>
//         <h1>{this.state.newUser}</h1>
//       </Col>
//       test: {this.state.test}
//     </Row>
//   );
// }