import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInformation } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // Import Link from React Router
import { encrypt, decrypt } from './encryptionFunctions'; // Import your encryption and decryption functions

class Bet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonText: "PLACE BET",
            buttonType: "btn-secondary",
            inputDisabled: false,
            buttonProgress: false,
            bits: "10",
            profit: 10,
            chance: 0,
            cashout: "2.00",
            bitError: false,
            outError: false,
            isToggleOn: false,
            hotkey: X("hotkey") ? X("hotkey") : "OFF",
        };
        window.addEventListener("keypress", this.handleHotKey.bind(this));
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBet = this.handleBet.bind(this);
        this.setBet = this.setBet.bind(this);
    }

    componentWillUnmount() {
        window.removeEventListener("keypress", this.handleHotKey.bind(this));
    }

    handleHotKey = (e) => {
        if (Fe.denied_hotkey) {
            Fe.denied_hotkey = false;
            Z("hotkey", "OFF");
            this.setState({ hotkey: "OFF" });
        }
        if (X("hotkey") === "ON") {
            const t = e.which || e.keyCode;
            if (t === 32) this.handleBet(e);
            if (t === 114) this.setState({ bits: this.state.bits === 0 ? 1 : parseInt(2 * this.state.bits) });
            if (t === 102) this.setState({ cashout: parseFloat(2 * this.state.cashout).toFixed(2) });
            if (t === 101) this.setState({ bits: parseInt(this.state.bits / 2) });
            if (t === 100) this.setState({ cashout: parseFloat(this.state.cashout / 2).toFixed(2) });
            this.handleInputChange(e);
        }
    }
    
    handleInputChange = (e) => {
        const isEmpty = Ke.a.isEmpty;
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if (isEmpty(value)) {
            if (name === g) this.setState({ bitError: "red-border" });
            if (name === "cashout") this.setState({ outError: "red-border" });
        } else {
            if (name === g) this.setState({ bitError: false });
            if (name === "cashout") this.setState({ outError: false });
        }
        if (!(name === "bits" && value >= 1001) && !(name === "cashout" && value >= 1001)) {
            this.setState({ [name]: value });
            const r = Number.parseFloat(this.state.bits);
            const i = Number.parseFloat(this.state.cashout);
            const o = Math.round(r * (i - 1));
            this.setState({ profit: le()(o).format("0,0[.]00") });
        }
    }
    
    setDefaultButton = () => {
        if (this._isMounted) {
            this.setState({ inputDisabled: false, buttonType: "btn-secondary", buttonText: "PLACE BET" });
        }
    }
    
    setWaitingButton = () => {
        if (this._isMounted) {
            this.setState({ inputDisabled: true, buttonType: "btn-danger", buttonText: "Please Wait..." });
        }
    }
    
    setOutButton = () => {
        if (this._isMounted) {
            this.setState({ inputDisabled: false, buttonType: "btn-success", buttonText: "CANCEL BET" });
        }
    }
    
    setBet = () => {
        fe.emit("play", Ve.encrypt({ amount: this.state.bits, cashout: parseInt(100 * this.state.cashout), uid: X(j) }));
    }

    outBet = () => {
        fe.emit("ccancel", Ve.encrypt({ uid: X(j) }));
    }
    
    cashOut = () => {
        fe.emit("finish", Ve.encrypt({ uid: X(j) }));
    }
    
    handleFinish = (e) => {
        if (e.uid === X(j)) {
            clearInterval(this.state.buttonProgress);
            Re("winner_text", "You Cashed Out at " + e.current / 100);
            ee(F, false);
            Re("im_in_game", false);
            this.setDefaultButton();
        }
    }
    
    handlePlay = (e) => {
        if (e.uid === X(j)) {
            ee(F, true);
        }
    }
    
    componentDidMount() {
        this._isMounted = true;
    
        fe.on("finish", (t) => {
            this.handleFinish(Ve.decrypt(t));
        });
    
        fe.on("play", (t) => {
            this.handlePlay(Ve.decrypt(t));
        });
    
        fe.on("game_status", (t) => {
            this.checkStatus(Ve.decrypt(t));
        });
    
        fe.on("waiting", () => {
            this.checkWaitingGame();
        });
    
        fe.on("busted", () => {
            this.checkBustedGame();
        });
    
        fe.on("started", () => {
            this.checkStartedGame();
        });
    }
    
    componentWillUnmount() {
        this._isMounted = false;
    }
    
    checkWaitingGame = () => {
        if (Fe.holding) {
            this.placeBet();
            Fe.holding = false;
        }
    }
    
    checkStartedGame = () => {
        if (X(F) || Fe.lock) {
            Fe.lock = false;
            Re("im_in_game", true);
            this.state.buttonProgress = setInterval(() => {
                const e = this.state.bits * (Fe.current_amount - 1);
                this.setState({ inputDisabled: false, buttonType: "btn-success", buttonText: g + " " + le()(e).format("0,0[.]00") });
            }, 50);
        }
    }
    
    checkBustedGame = () => {
        if (!Fe.holding) {
            clearInterval(this.state.buttonProgress);
            this.setDefaultButton();
            Re("im_in_game", false);
            ee(F, false);
        }
    }
    
    checkStatus = (e) => {
        switch (e.status) {
            case "waiting":
                this.checkWaitingGame();
                break;
            case "started":
                this.checkStartedGame();
                break;
            case "busted":
                this.checkBustedGame();
        }
    }
    
    isLoggedUser = (e) => {
        if (e !== null) {
            return true;
        } else {
            Ye.a.fire({ title: "Error", text: "Please Login to use this option", type: "warning" });
            return false;
        }
    }
    
    isCorrectBet = (e, t, a) => {
        if (e && e !== 0 && !isNaN(e) && /^[-]?\d+|\d+.$/.test(e) && e >= 1 && !(100 * t < 100) && 100 * t !== 100 && (X(F) || (e <= a && e !== 0)) ) {
            return true;
        } else {
            Ye.a.fire({ title: "Error", text: "Your Cash is not enough !", type: "warning" });
            return false;
        }
    }
    
    placeBet = () => {
        if (!Fe.lock) {
            ee(F, true);
            this.setBet();
            this.setWaitingButton();
            Fe.lock = true;
        }
    }
    
    holdBet = () => {
        if (Fe.holding) {
            this.outBet();
            this.setDefaultButton();
            Fe.holding = false;
        } else {
            this.setOutButton();
            Fe.holding = true;
        }
    }
    

    handleBet = (e) => {
        e.preventDefault();
        const t = X(j);
        const a = X(F);
        const n = Fe.lock;
        const s = ue.status;
        const l = Fe.credit;
        const r = this.state.bits;
        const i = this.state.cashout;
        
        if (parseFloat(i) > 99999) {
            this.setState({ outError: "red-border" });
        }
        
        if (!this.isLoggedUser(t) || !this.isCorrectBet(r, i, l) || n) {
            return;
        }
        
        const o = 1 * i;
        this.setState({ cashout: o.toFixed(2) });

        switch (s) {
            case "waiting":
                this.placeBet();
                break;
            case "started":
                a ? this.cashOut() : this.holdBet();
        }
    }

    hotkeyChange = () => {
        if (this.state.hotkey === "OFF") {
            Fe.denied_hotkey = false;
            ee("hotkey", "ON");
            this.setState({ hotkey: "ON" });
        } else {
            ee("hotkey", "OFF");
            this.setState({ hotkey: "OFF" });
        }
    }

    render() {
        const t = this.state.hotkey === "OFF" ? "label-grey" : "label-success";
        const a = this.props.mobile ? " mb-0" : "";
        const n = this.props.mobile ? " py-4" : "";
        return (
            <div
                onKeyPress={(t) => this.handleHotKey(t)}
            >
                <div className="row">
                    <form
                        className={`w-90 mx-auto my-4`}
                        onSubmit={(t) => this.handleBet(t)}
                    >
                        <W.a>
                            <div className={`input-group col-6`}>
                                <span className={`input-group-btn`}>
                                    <button className={`btn btn-default btn-number`} type={`button`} disabled={`disabled`} datatype={`minus`} datafield={`bits`}>
                                        <span className={`mdi mdi-minus`}></span>
                                    </button>
                                </span>
                                <input
                                    className={`form-control input-number`}
                                    type={`number`}
                                    id={`bits`}
                                    min={`10`}
                                    step={`5`}
                                    name={`bits`}
                                    max={`1000`}
                                    placeholder={`Enter Bet`}
                                    value={this.state.bits}
                                    autoComplete={`off`}
                                    onKeyUp={this.handleInputChange}
                                    onChange={this.handleInputChange}
                                />
                                <span className={`input-group-btn`}>
                                    <button className={`btn btn-default btn-number`} type={`button`} datatype={`plus`} datafield={`bits`}>
                                        <span className={`mdi mdi-plus`}></span>
                                    </button>
                                </span>
                            </div>
                            <G.a className={`m-auto col-6`}>
                                <div className={`form-group rev ${a}`}>
                                    <Le.a
                                        variant={`btn  waves-light btn-md btn-block btn-b ${n} btn-bet ${this.state.buttonType}`}
                                        disabled={this.state.inputDisabled}
                                        onClick={this.handleBet}
                                        type={`submit`}
                                    >
                                        {this.state.buttonText}
                                    </Le.a>
                                </div>
                            </G.a>
                        </W.a>
                        {!this.props.mobile &&
                            <G.a sm={11} md={11} className={`m-auto`}>
                                <div className={`form-inline text-center`}>
                                    <div className={`col-md-6 col-sm-6 font-12 text-grey text-left`}>
                                        Target Profit: <span>{this.state.profit} {g}</span>
                                    </div>
                                    <div className={`col-md-6 col-sm-6 font-12 text-grey text-right`}>
                                        <span
                                            onClick={() => this.hotkeyChange()}
                                        >
                                            <span className={`cp`}>Hotkeys:</span>{" "}
                                            <span className={`label ${t}`}>{this.state.hotkey}</span>
                                        </span>
                                        <SweetAlert
                                            placement={`top`}
                                            trigger={`click`}
                                            overlay={Je("hello")}
                                        >
                                            <FontAwesomeIcon
                                                className={`cp p-2 mdi mdi-information`}
                                                icon={faInformation}
                                            />
                                        </SweetAlert>
                                    </div>
                                </div>
                            </G.a>
                        }
                    </form>
                </div>
            </div>
        );
    }
}

export default Bet;
