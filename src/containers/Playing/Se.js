import React, { Component } from 'react';
import { Card, Table } from 'react-bootstrap'; // Replace with appropriate imports

class Se extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    isMyFriend = (name) => {
        let isFriend = false;
        const myFriends = JSON.parse(localStorage.getItem('myFriends')); // Replace with actual storage mechanism

        if (myFriends !== null) {
            myFriends.forEach((friend) => {
                if (friend === name) {
                    isFriend = true;
                }
            });
        }

        return isFriend;
    };

    render() {
        const t = [];
        const a = [];
        const n = [];
        const { players, winners } = this.props;

        players.forEach((player, index) => {
            if (!n.includes(player.name)) {
                n.push(player.name);
                t.push(
                    <PlayerRow
                        friend={this.isMyFriend(player.name)}
                        currentPlayer={player}
                        key={index}
                        isWinner={false}
                        isFailed={false}
                    />
                );
            }
        });

        winners.forEach((winner, index) => {
            if (!n.includes(winner.name)) {
                n.push(winner.name);
                a.push(
                    <PlayerRow
                        friend={this.isMyFriend(winner.name)}
                        currentPlayer={winner}
                        key={index}
                        isWinner={true}
                        isFailed={false}
                    />
                );
            }
        });

        let we = 0;
        const ke = [0];

        players.forEach((player, index) => {
            ke.push(parseFloat(player.amount));
        });

        we = ke.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        return (
            <Card className="mb-0">
                <Card.Body className="text-center card-body p-0">
                    <Table className="my-2">
                        <thead>
                            <tr>
                                <th className="col-4 text-left font-weight-bold pl-3">User</th>
                                <th className="col-2 font-weight-bold">@</th>
                                <th className="col-3 font-weight-bold">Bet</th>
                                <th className="col-3 font-weight-bold">Profit</th>
                            </tr>
                        </thead>
                        <tbody>{t}{a}</tbody>
                    </Table>
                    <div className="mt-2 row pt-0 pb-2 row stats">
                        <div className="col-4">Online: <span>{Math.floor(Math.random() * (400 - 320) + 320)}</span></div>
                        <div className="col-4">Playing: <span>{players.length}</span></div>
                        <div className="col-4 text-center">
                            <span className="text-warning font-11" id="betstat">{le()(we).format("0,0[.]00")} g</span>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

export default Se;
