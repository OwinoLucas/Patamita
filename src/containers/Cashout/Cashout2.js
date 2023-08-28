import React, { Component } from 'react';
import { Button } from 'react-bootstrap'; // Import necessary components
import { Link } from 'react-router-dom'; // If using React Router


class Cashout2 extends React.Component {
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

        this._isMounted = false;

        this.handleHotKey = this.handleHotKey.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBet = this.handleBet.bind(this);
        this.setBet = this.setBet.bind(this);
    }

    componentWillUnmount() {
        window.removeEventListener("keypress", this.handleHotKey.bind(this));
        // Rest of your componentWillUnmount logic
    }

    handleHotKey(e) {
        // Your handleHotKey logic
    }

    handleInputChange(e) {
        // Your handleInputChange logic
    }

    setDefaultButton() {
        // Your setDefaultButton logic
    }

    setWaitingButton() {
        // Your setWaitingButton logic
    }

    setOutButton() {
        // Your setOutButton logic
    }

    setBet() {
        // Your setBet logic
    }

    // Rest of your component methods

    componentDidMount() {
        this._isMounted = true;
        window.addEventListener("keypress", this.handleHotKey.bind(this));

        // Rest of your componentDidMount logic
    }

    componentWillUnmount() {
        this._isMounted = false;
        // Rest of your componentWillUnmount logic
    }

    render() {
        const t = "label-success";
        if ("OFF" === this.state.hotkey) {
            t = "label-grey";
        }
        const a = "mb-4";
        const n = "py-3";

        return (
            <div
                onKeyPress={(t) => {
                    this.handleHotKey(t);
                }}
            >
                <div className="row cashout-partt">
                    <form
                        className="w-90 mx-auto my-4 yyy"
                        onSubmit={(t) => {
                            this.handleBet(t);
                        }}
                    >
                        <W.a>
                            {!this.props.mobile && (
                                <G.a className="m-auto">
                                    <div className="form-inline text-center">
                                        <div className="form-group col-lg-12 col-sm-12 px-0 d-flex">
                                            <label className="l-cash">CASHOUT</label>
                                            <span className="input-group-btn">
                                                <button className="btn btn-default btn-num" type="button" datatype="minus" datafield="cashout">
                                                    <span className="mdi mdi-minus"></span>
                                                </button>
                                            </span>
                                            <input
                                                className="form-control mx-2"
                                                type="number"
                                                id="cashout"
                                                name="cashout"
                                                min="1.01"
                                                max="99999"
                                                step="1"
                                                placeholder="Enter Cashout"
                                                value={this.state.cashout}
                                                autoComplete="on"
                                                onKeyUp={this.handleInputChange}
                                                onChange={this.handleInputChange}
                                            />
                                            <span className="input-group-btn">
                                                <button className="btn btn-default btn-num num" type="button" datatype="plus" datafield="cashout">
                                                    <span className="mdi mdi-plus"></span>
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                </G.a>
                            )}
                        </W.a>
                    </form>
                </div>
            </div>
        );
    }
}

export default Cashout2;