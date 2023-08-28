import React, { Component } from 'react';
import Se from './Se';

class Ce extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const t = X(D) !== null ? X(D) : 50;
        const sortedPlayers = [...this.props.players].sort((a, b) => (a.amount && b.amount ? b.amount - a.amount : 0));
        const sortedWinners = [...this.props.winners].sort((a, b) => (a.current && b.current ? b.current - a.current : 0));
        
        sortedPlayers.length = Math.min(sortedPlayers.length, t);
        sortedWinners.length = Math.min(sortedWinners.length, t);

        return <Se height={this.props.height} players={sortedPlayers} winners={sortedWinners} />;
    }
}

export default Ce;
