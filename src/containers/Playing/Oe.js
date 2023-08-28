import React, { Component } from 'react';
import PerfectScrollbar from 'perfect-scrollbar'; // Import PerfectScrollbar if it's used in your code
import Xe from './Xe';

class Oe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [],
            winners: [],
            failed: [],
            isWinner: false,
        };
    }

    componentDidMount() {
        new PerfectScrollbar(".queue-list", { wheelSpeed: 1, suppressScrollX: true, wheelPropagation: true, minScrollbarLength: 2 }).update();
        fe.emit("game_status");
    }

    onChange(e, t, a) {
        this.setState({ players: t, isWinner: a });
    }

    onWinner(e, t) {
        this.setState({ winners: t });
    }

    render() {
        const { players, winners } = this.state;

        return (
            <Xe height={this.props.height} onChange={this.onChange.bind(this, players)} onWinner={this.onWinner.bind(this, winners)} />
        );
    }
}

export default Oe;
