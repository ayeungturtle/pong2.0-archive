import React, { Component } from 'react';
import { FormControl, FormGroup, Button, Grid, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { NewPlayerModalComponent } from './components/NewPlayerModalComponent';
import { AlertComponent } from './components/AlertComponent';
import { PingKingComponent } from './components/PingKingComponent';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.showNewPlayerModal = this.showNewPlayerModal.bind(this);
        this.hideNewPlayerModal = this.hideNewPlayerModal.bind(this);
        this.saveNewPlayer = this.saveNewPlayer.bind(this);
        this.dismissAlert = this.dismissAlert.bind(this);

        this.state = { 
            newPlayerModal: false,
            newPlayer: {
                firstName: null,
                lastName: null,
                nickName: null
            },
            alertType: 0
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

    saveNewPlayer(newPlayer) {
        fetch('api/players', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify ({
            firstName: newPlayer.firstName,
            lastName: newPlayer.lastName,
            nickName: newPlayer.nickName === '' ? null : newPlayer.nickName
        })
        })
        .then(res => {
            if (res.status === 201) {
                const newPlayer = res.json()
                .then(newPlayer => {
                    this.setState({
                        newPlayer:{
                            firstName: newPlayer.firstName,
                            lastName: newPlayer.lastName,
                            nickName: newPlayer.nickName
                        },
                        alertType: 1
                    })
                });
                setTimeout(() => this.setState({ alertType: 0 }), 5000);
            }
            else {
                this.setState({ alertType: 2 });
                setTimeout(() => this.setState({ alertType: 0 }), 5000);                
            }
        })
    }

    dismissAlert() {
        this.setState({ alertType: 0 })
    }

    render() {
        return (
            <Grid>
                <Row className="header-row">
                    <Col md={10}>
                        <Tabs defaultActiveKey={0} id="Game Mode Tabs">
                            <Tab eventKey={0} title="Ping King">
                                <PingKingComponent/>
                            </Tab>
                            <Tab eventKey={1} title="Random Robin">
                                rando
                            </Tab>
                        </Tabs>
                    </Col>
                    <Col md={2}>
                        <Button bsStyle="primary" onClick={this.showNewPlayerModal}>
                            New Player
                        </Button>
                    </Col>
                </Row>
                <NewPlayerModalComponent 
                    newPlayerModal={this.state.newPlayerModal}
                    hideNewPlayerModal={this.hideNewPlayerModal}
                    saveNewPlayer={(newPlayer) => this.saveNewPlayer(newPlayer)}
                />
                <AlertComponent
                    alertType={this.state.alertType}
                    newPlayer={this.state.newPlayer}
                    dismissAlert={this.dismissAlert}
                />
            </Grid>
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