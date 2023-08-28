import React, { Component } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import Swal from 'sweetalert2'; // Import SweetAlert2

class Wt extends Component {
    handleModal = (e, t) => {
        Swal.fire({
            html: `
                <label>HASH</label>
                <input onclick="this.focus();this.select();" type="text" class="form-control" value="${e}" readonly>
                <label class="mt-3">SHA256</label>
                <input onclick="this.focus();this.select();" type="text" class="form-control" value="${t}" readonly>
            `,
        });
    };

    render() {
        return (
            <W.a className="mt-1 py-0">
                <G.a xs="2" className="pt-1">
                    <Link
                        to={"/game/" + this.props.game_id}
                        className={"text-" + this.props.color + " text-danger font-14"}
                    >
                        {this.props.busted}
                    </Link>
                </G.a>
                <G.a xs="2" className="pt-1">
                    {this.props.cashout ? this.props.cashout : "-"}
                </G.a>
                <G.a xs="2" className="pt-1">
                    {this.props.amount ? this.props.amount : "-"}
                </G.a>
                <G.a xs="2" className="pt-1">
                    {this.props.won ? this.props.won : "-"}
                </G.a>
                <G.a
                    xs="4"
                    className="pointer"
                    onClick={() => {
                        this.handleModal(this.props.md5, this.props.hash);
                    }}
                >
                    <input
                        type="text"
                        className={`form-control font-12 h-100 no-radius pointer waves-effect waves-light bg-soft-${this.props.color}`}
                        value={this.props.hash.substr(0, 80) + "..."}
                        readOnly={true}
                    />
                </G.a>
            </W.a>
        );
    }
}

export default Wt;
