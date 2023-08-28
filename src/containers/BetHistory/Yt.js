import React, { Component } from 'react';
import { decrypt } from './path/to/vt'; // Replace with actual path
import Wt from './Wt';


class Yt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            historyRow: [],
            players: [],
            game_id: "",
            busted: "",
            hash: "",
            color: "",
            md5: "",
        };
        this._isMounted = false;
    }

    List = (e) => {
        if (this._isMounted) {
            let t, a, n;
            const l = (e.amount / 100).toFixed(2);
            const r = l >= 1.5 ? "success" : "danger";

            e.players.forEach((player) => {
                if (player.uid === X(j)) {
                    t = "BUSTED";
                    n = le()(player.amount).format("0,0[.]00");
                    a = "-" + le()(player.amount).format("0,0[.]00");
                }
            });

            e.winners.forEach((winner) => {
                if (winner.uid === X(j)) {
                    t = (winner.current / 100).toFixed(2) + "x";
                    n = le()(winner.amount).format("0,0[.]00");
                    a = le()(winner.won).format("0,0[.]00");
                }
            });

            const i = (
                <Wt
                    cashout={t}
                    won={a}
                    amount={n}
                    players={e.players}
                    hash={e.hash}
                    md5={e.md5}
                    game_id={e.game_id}
                    busted={l}
                    color={r}
                />
            );

            this.state.historyRow.unshift(i);

            this.setState({
                game_id: e.game_id,
                players: e.players,
                hash: e.hash,
                md5: e.md5,
                busted: l,
                color: r,
            });

            this.props.onChange(e);
        }
    };

    gameSync = (e) => {
        if (this._isMounted) {
            e.crashes.forEach((crash) => {
                let n, l, r;

                crash.players.forEach((player) => {
                    if (player.uid === X(j)) {
                        n = "BUSTED";
                        r = le()(player.amount).format("0,0[.]00");
                        l = "-" + le()(player.amount).format("0,0[.]00");
                    }
                });

                crash.winners.forEach((winner) => {
                    if (winner.uid === X(j)) {
                        n = (winner.current / 100).toFixed(2) + "x";
                        r = le()(winner.amount).format("0,0[.]00");
                        l = le()(winner.won).format("0,0[.]00");
                    }
                });

                const i = (crash.amount / 100).toFixed(2);
                const o = i >= 1.5 ? "success" : "danger";

                const c = (
                    <Wt
                        cashout={n}
                        won={l}
                        amount={r}
                        players={crash.players}
                        hash={crash.hash}
                        md5={crash.md5}
                        game_id={crash.game_id}
                        busted={i}
                        color={o}
                    />
                );

                this.setState((prevState) => ({
                    historyRow: [c, ...prevState.historyRow],
                }));

                this.props.onChange(crash);
            });
        }
    };

    componentDidMount() {
        this._isMounted = true;
        fe.on("game_status", (t) => this.gameSync(decrypt(t)));
        fe.on("busted", (t) => this.List(decrypt(t)));
    }

    componentWillUnmount() {
        this._isMounted = false;
        fe.on("disconnect");
    }

    render() {
        return (
            <React.Fragment>
                <W.a className="p-2">
                    <G.a xs="2">BUST</G.a>
                    <G.a xs="2">@</G.a>
                    <G.a xs="2">BET</G.a>
                    <G.a xs="2">PROFIT</G.a>
                    <G.a xs="4" className="text-center">
                        HASH / SHA256
                    </G.a>
                </W.a>
                <div className="history-list" style={this.props.height}>
                    {this.state.historyRow}
                </div>
            </React.Fragment>
        );
    }
}

export default Yt;
