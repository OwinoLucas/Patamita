import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Et from '';

const TopNav = ({ mobile }) =>  {
    return (
        <Navbar collapseOnSelect expand="lg" variant="dark" className="pt-2 pb-0 mb-nav topnav" defaultExpanded={false}>
            <Navbar.Brand>
                <div className="logo-site">
                    <h1 className="m-0 p-0">
                        <Link to="/">
                            <i className="mdi mdi-rocket align-middle logo-text" />
                            <b className="d-inline-block font-18 logo-text pm">{v}</b>
                        </Link>
                    </h1>
                </div>
            </Navbar.Brand>
            {/* Navbar.Toggle component */}
            {this.state.mobile && (
                <div id="">
                    <Dropdown className="dd" id="menu">
                        <Et />
                    </Dropdown>
                    <Dropdown {...this.state.mobile}>
                        {!this.state.mobile && <Et />}
                    </Dropdown>
                </div>
            )}
            <Navbar.Collapse id="responsive-navbar-nav">
                <Dropdown className="dd" id="menu">
                    <ae />
                </Dropdown>
                <Dropdown {...this.state.mobile}>
                    {!this.state.mobile && <Et />}
                </Dropdown>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default TopNav;
