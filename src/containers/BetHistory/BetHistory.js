import React, { Component } from 'react';
import PerfectScrollbar from 'perfect-scrollbar';
import Yt from './Yt';

class BetHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [],
            game_id: "",
            busted: "",
            hash: "",
            md5: "",
        };
    }

    componentDidMount() {
        new PerfectScrollbar(".history-list", { wheelSpeed: 1, suppressScrollX: true, wheelPropagation: true, minScrollbarLength: 2 }).update();
    }

    onChange = (e, t, a, n, s, l) => {
        const r = (l / 100).toFixed(2);
        this.setState({
            md5: n,
            hash: a,
            busted: r,
            game_id: s,
            players: t,
            color: r >= 1.5 ? "success" : "danger",
        });
    };

    render() {
        const { players, hash, md5, game_id, amount } = this.state;

        return (
            <Yt height={this.props.height} onChange={this.onChange.bind(this, players, hash, md5, game_id, amount)} />
        );
    }
}

export default BetHistory;
