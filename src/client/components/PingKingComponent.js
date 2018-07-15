import React, { Component } from 'react';
import { Alert, Modal, Button, FormGroup, Select, Row, FormControl, DropdownButton, MenuItem, Col, ControlLabel, ListGroup, ListGroupItem } from 'react-bootstrap';

export class PingKingComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        
        this.state = {
            playerQueue: [],
            inactivePlayers: [],
            selectedPlayer: null,
            player1: null,
            player2: null
        };
        
        this.getPlayers = this.getPlayers.bind(this);
        this.enqueuePlayer = this.enqueuePlayer.bind(this);
        this.removeFromQueue = this.removeFromQueue.bind(this);
    }

    componentDidMount() {
        this.getPlayers();
    }

    getPlayers() {
        fetch('api/players', {
            method: 'GET'
        })
        .then(res => {
            if (res.status === 200) {
                res.json()
                .then(players => {
                    this.setState({ inactivePlayers: players })
                });
            }
        });
    };

    enqueuePlayer(selectedPlayer) {
        if (selectedPlayer != null) {
            const tempInactivePlayers = this.state.inactivePlayers;
            this.state.inactivePlayers.forEach((player, index) => {
                if (player.id === selectedPlayer.id)
                    tempInactivePlayers.splice(index, 1);
            });
            this.setState({ playerQueue: [...this.state.playerQueue, selectedPlayer], inactivePlayers: tempInactivePlayers });
        }
    }

    removeFromQueue(removePlayer) {
        var tempInactivePlayers = this.state.inactivePlayers;
        var tempPlayerQueue = this.state.playerQueue;
        var nextInactivePlayerString;
        var previousInactivePlayerString;
        var removePlayerString;
        if (removePlayer != null) {
            this.state.playerQueue.forEach((queuedPlayer, index) => {
                if (queuedPlayer.id === removePlayer.id) {
                    tempPlayerQueue.splice(index, 1);
                    for (var i = 0; i < this.state.inactivePlayers.length; i++) {
                        nextInactivePlayerString = this.formatPlayerName(this.state.inactivePlayers[i]).toLowerCase();
                        removePlayerString = this.formatPlayerName(removePlayer).toLowerCase();
                        if (i === 0) {
                            if (removePlayerString < nextInactivePlayerString) {
                                tempInactivePlayers.unshift(removePlayer);
                                break;
                            }
                        } else {
                            previousInactivePlayerString = this.formatPlayerName(this.state.inactivePlayers[i-1]).toLowerCase();
                            if (removePlayerString > previousInactivePlayerString && removePlayerString < nextInactivePlayerString){
                                tempInactivePlayers = tempInactivePlayers.slice(0, i).concat(removePlayer, tempInactivePlayers.slice(i));
                                break;
                            }
                            else if (i === this.state.inactivePlayers.length - 1)
                                tempInactivePlayers = tempInactivePlayers.concat(removePlayer);
                        }   
                    }
                    // this.state.inactivePlayers.forEach((inactivePlayer, index) => {
                    //     if (index === 0) {
                    //         if (removePlayer.firstName < inactivePlayer.firstName)
                    //             tempInactivePlayers.unshift(removePlayer);
                    //     }
                    //     else {
                    //         if (removePlayer.firstName > this.state.inactivePlayers[index - 1].firstName && removePlayer.firstName < inactivePlayer.firstName) {
                    //             console.log("between" + tempInactivePlayers[index - 1].firstName + " and " + tempInactivePlayers[index].firstName)
                    //             tempInactivePlayers = [tempInactivePlayers.slice(0, index), removePlayer, tempInactivePlayers.slice(index)];
                    //         }
                    //     }
                    // });
                }
            });
        }
        this.setState({ inactivePlayers: tempInactivePlayers, playerQueue: tempPlayerQueue })
    }


    formatPlayerName(player) {
        return (player.firstName + " " + player.lastName);
    }
  
    render() {
        return (
            <Row>
                <Col md={3} sm={3}>
                    <Row>
                        {/* <Select>
                            name="addPlayer"
                            placeholder="Add Player"
                            searchable={true}
                            clearable={true}
                            onChange={this.enqueuePlayer}
                            options={this.props.players.map(player => {
                                return {...player, value: player.id, label: player.FirstName + " " + player.LastName };
                                }
                            )}
                        </Select> */}
                        <Col md={8} sm={8}>
                            <DropdownButton id="Add Player" title="Add Player" onSelect={(event) => this.enqueuePlayer(event)}>
                                {
                                    this.state.inactivePlayers.map((player, index) => {
                                        return(
                                            <MenuItem eventKey={player} key={index}>{this.formatPlayerName(player)}</MenuItem>
                                        )
                                    })
                                }
                            </DropdownButton>
                            {/* <FormGroup controlId="addPlayer">
                                <ControlLabel>Add Player</ControlLabel>
                                <FormControl
                                    onChange={on()this.selectPlayer()} 
                                    componentClass="select" 
                                    placeholder="select player..."
                                    id="addPlayer"
                                >
                                    {
                                        this.state.inactivePlayers.map((player, index) => {
                                            return(
                                                <option 
                                                    onClick={() => this.selectPlayer(player)} 
                                                    key={index} 
                                                    value={player}>{this.formatPlayerName(player)}
                                                </option>
                                            )
                                        })
                                    }
                                </FormControl>
                            </FormGroup> */}
                        </Col>
                        {/* <Col md={4} sm={4}>
                            <button onClick={this.enqueuePlayer}>+</button>
                        </Col> */}
                    </Row>
                    <Row>
                        <ListGroup>
                            {
                                this.state.playerQueue.map((player, index) => {
                                    return(
                                        <ListGroupItem key={index} value={player}>
                                            {this.formatPlayerName(player)}
                                            <button className="pull-right" onClick={() => this.removeFromQueue(player)}>-</button>
                                        </ListGroupItem>
                                    )
                                })
                            }                 
                        </ListGroup>
                    </Row>
                </Col>
            </Row>
        )
    }
}