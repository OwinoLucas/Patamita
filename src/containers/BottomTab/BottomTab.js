import React, { Component } from 'react';
import { Tabs, Tab, Container } from 'react-bootstrap';
import HistoryTab from './HistoryTab'; // Import your tab components

class BottomTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false
        };
    }

    componentDidMount() {
        if (X(j) !== null) {
            this.setState({ isLogged: true });
        }
    }

    render() {
        return (
            <Container fluid className="no-shadow mt-1 mb-1 mx-2">
                <Tabs defaultActiveKey="history" transition={false} id="bottom-tabs">
                    <Tab eventKey="history" title="History" tabClassName="waves-effect waves-light">
                        <div className="mt-3">
                            <HistoryTab height={l} />
                        </div>
                    </Tab>
                    <Tab eventKey="game" title="Active" tabClassName="waves-effect waves-light" id="#chat">
                        <div className="mt-3">
                            <ActiveTab height={l} />
                        </div>
                    </Tab>
                    <Tab eventKey="chat" title="Chat" tabClassName="waves-effect waves-light">
                        <div className="mt-3">
                            <ChatTab height={l} />
                        </div>
                    </Tab>
                    <Tab eventKey="setting" title="Setting" tabClassName="waves-effect waves-light">
                        <div className="mt-3">
                            <SettingTab />
                        </div>
                    </Tab>
                    <Tab eventKey="refferal" title="Refferal" id="refferal-history" tabClassName="waves-effect waves-light">
                        <div className="mt-3">
                            <RefferalTab />
                        </div>
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

export default BottomTab;
