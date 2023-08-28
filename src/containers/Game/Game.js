import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cashout2 from '../Cashout/Cashout2';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canvasHeight: 300,
            connecting: true,
            hash: null,
            status: '',
            timer: '',
            rate: '',
            // width: window.innerWidth,
        };
        this._isMounted = false;

        this.handleResize = this.handleResize.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.handleResize();
        this.setState({ width: window.innerWidth });

        window.addEventListener('resize', this.handleResize);

        fe.on('waiting', (t) => this.waiting(Me.decrypt(t)));
        fe.on('started', (t) => this.start(Me.decrypt(t)));
        fe.on('busted', (t) => this.busted(Me.decrypt(t)));
        fe.on('game_status', (t) => this.status(Me.decrypt(t)));

        const t = this.state.canvasHeight;
        Te = new Ue();
        Te.init(t);
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.setState({ connecting: true });
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize() {
        this.setState({ width: window.innerWidth });

        let e = 560;
        if (this.isTablet()) {
            e = 399;
        }
        Object(ne.setVal)('cWidth', e);

        let t = 87;
        if (this.isTablet()) {
            t = 50;
        }
        Object(ne.setVal)('cFont', t);
    }

    isTablet() {
        return this.state.width < 1100;
    }

    isMobile() {
        return this.state.width < 992;
    }

    waiting(e) {
        if (this._isMounted && Te !== null) {
            Te.setWaiting(e.time);
            this.setState({ status: 'waiting' });
        }
    }

    start(e) {
        if (this._isMounted) {
            this.setState({ status: 'started' });
            if (Te !== null) {
                Te.setPlaying(e.time, e.md5);
            }
        }
    }

    busted(e) {
        if (this._isMounted) {
            const t = (e.amount / 100).toFixed(2);
            if (Te !== null) {
                Te.setBusted(t, e.time);
            }
            this.setState({ status: 'busted', timer: e.time, rate: t });
        }
    }

    status(e) {
        if (this._isMounted) {
            this.setState({ status: e.status, timer: e.time, connecting: false });
            if (e.status === 'started' && Te !== null) {
                Te.setPlaying(e.time, e.md5);
            } else if (e.status === 'waiting' && Te !== null) {
                Te.setWaiting(e.time);
            }
        }
    }

    render() {
        let e = { display: 'unset' };
        if (this.state.connecting) {
            e = { display: 'none' };
        }

        let xt = { height: '60px', width: '100%' };
        if (isMobile) {
            xt = { width: '100%' };
        }

        return (
            <div>
                <Link to="leaderboard" className="img">
                    <img className="img rounded" src="/static/ads/leader.jpg" alt="Referral" style={xt} />
                </Link>
                <div className="game-holder h-100">
                    {this.state.connecting && (
                        <React.Fragment>
                            <b className="text-danger font-35 mt-2 d-block py-5">CONNECTING</b>
                            <b className="text-danger mb-4 d-block">
                                <div className="spinner-border text-danger" role="status"></div>
                            </b>
                        </React.Fragment>
                    )}
                    <De />
                    <canvas className="mt-3" id="graph" style={e}></canvas>
                </div>
                <Link to="refferal-history" className="img">
                    <img className="img rounded" src="/static/ads/earn.jpg" alt="Referral" style={xt} />
                </Link>
                <Cashout2 />
            </div>
        );
    }
}

export default Game;
