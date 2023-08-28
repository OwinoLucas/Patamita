import React, { Component } from 'react';
import Ce from './Ce';

class Xe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playersObject: [],
            winnersObject: [],
        };
        this._isMounted = false;
    }

    syncPlayPlayer(e) {
        if (this._isMounted) {
            this.state.playersObject.push(e);
            this.props.onChange(this.state.playersObject);
        }
    }

    syncFinishPlayer(e) {
        if (this._isMounted) {
            this.state.playersObject.forEach((a, n) => {
                if (a.uid === e.uid) {
                    this.state.playersObject.splice(n, 1);
                    this.state.winnersObject.push(e);
                    this.props.onWinner(this.state.winnersObject);
                }
            });
        }
    }

    gameSync(e) {
        if (this._isMounted) {
            e.players.forEach((e, a) => {
                this.state.playersObject.push(e);
            });
            this.props.onChange(this.state.playersObject);
            e.winners.forEach((e, a) => {
                this.state.winnersObject.push(e);
            });
            this.props.onWinner(this.state.winnersObject, true);
        }
    }

    emptyQueue(e) {
        if (this._isMounted) {
            this.setState({ playersObject: [], winnersObject: [] });
            this.state.playersObject.shift();
            this.state.winnersObject.shift();
            e.players.forEach((e, a) => {
                this.state.playersObject.push(e);
            });
            this.props.onChange(this.state.playersObject);
            e.winners.forEach((e, a) => {
                this.state.winnersObject.push(e);
            });
            this.props.onWinner(this.state.winnersObject, true);
        }
    }

    isWaiting(e) {
        if (this._isMounted) {
            this.setState({ playersObject: [], winnersObject: [] });
            e.players.forEach((e, a) => {
                this.state.playersObject.push(e);
            });
            this.props.onChange(this.state.playersObject);
        }
    }

    componentDidMount() {
        this._isMounted = true;
        fe.on("play", (t) => this.syncPlayPlayer(ge.decrypt(t)));
        fe.on("finish", (t) => this.syncFinishPlayer(ge.decrypt(t)));
        fe.on("busted", (t) => this.emptyQueue(ge.decrypt(t)));
        fe.on("waiting", (t) => this.isWaiting(ge.decrypt(t)));
        fe.on("game_status", (t) => this.gameSync(ge.decrypt(t)));
    }

    componentWillUnmount() {
        this._isMounted = false;
        fe.off("disconnect");
    }

    render() {
        return <Ce height={this.props.height} players={this.state.playersObject} winners={this.state.winnersObject} />;
    }
}

export default Xe;
