import React, { Component } from 'react';
import { FormControl, FormGroup, Button, Grid, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { NewPlayerModalComponent } from './components/NewPlayerModalComponent';
import { AlertComponent } from './components/AlertComponent';
import { PingKingComponent } from './components/PingKingComponent';
import { NewPlayerComponent } from './components/NewPlayerComponent';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            players: [],
            newPlayerModal: false,
            newPlayer: {
                firstName: null,
                lastName: null,
                nickName: null
            },
            alertType: 0,
            pingKing: {
                players: [],
                activePlayers: [],
                inactivePlayers: []
            },
            lastGameSaved: null
        };

        this.showNewPlayerModal = this.showNewPlayerModal.bind(this);
        this.hideNewPlayerModal = this.hideNewPlayerModal.bind(this);
        this.saveNewPlayer = this.saveNewPlayer.bind(this);
        this.dismissAlert = this.dismissAlert.bind(this);
        this.getPlayers = this.getPlayers.bind(this);
        this.alertGameSaved = this.alertGameSaved.bind(this);
    }

    componentDidMount() {
        this.getPlayers();
    }

    showNewPlayerModal() {
        this.setState({ newPlayerModal: true });
    }

    hideNewPlayerModal() {
        this.setState({ newPlayerModal: false });
    }

    getPlayers() {
        fetch('api/players', {
            method: 'GET'
        })
        .then(res => {
            if (res.status === 200) {
                res.json()
                .then(players => {
                    this.setState({ players: players })
                });
            }
        });
    };

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
                setTimeout(() => this.dismissAlert(), 5000);
            }
            else {
                this.setState({ alertType: 2 });
                setTimeout(() => this.dismissAlert(), 5000);                
            }
        })
    }

    alertGameSaved(success, newGame) {
        if (success) {
            this.setState({ alertType: 3, lastGameSaved: newGame });
            setTimeout(() => this.dismissAlert(), 5000);
        } 
        else {
            this.setState({ alertType: 4 });
            setTimeout(() => this.dismissAlert(), 5000);
        }
    }

    dismissAlert() {
        this.setState({ alertType: 0 })
    }

    render() {
        return (
            <Grid>
                <Row className="header-row">
                    <Col md={12}>
                        <Tabs defaultActiveKey={0} id="Game Mode Tabs">
                            <Tab eventKey={0} title="Ping King">
                                <PingKingComponent
                                alertGameSaved={(success, newGame) => this.alertGameSaved(success, newGame)}
                                />
                            </Tab>
                            <Tab eventKey={1} title="Random Robin">
                                rando
                            </Tab>
                            <Tab eventKey={2} title="New Player">
                                <NewPlayerComponent 
                                    newPlayerModal={this.state.newPlayerModal}
                                    hideNewPlayerModal={this.hideNewPlayerModal}
                                    saveNewPlayer={(newPlayer) => this.saveNewPlayer(newPlayer)}
                                />
                            </Tab>
                        </Tabs>
                    </Col>
                    {/* <Col >
                        <Row>
                            <Button bsStyle="primary" onClick={this.showNewPlayerModal}>
                                New Player
                            </Button>
                        </Row>
                    </Col> */}
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
                    lastGameSaved={this.state.lastGameSaved}
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