import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import BottomTab from './BottomTab';

class BottomTab2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 310
        };
    }

    componentDidMount() {
        const halfHeight = this.getHeight() / 2 - 20;
        this.setState({ height: halfHeight });
    }

    getHeight() {
        return document.documentElement.clientHeight || document.body.clientHeight;
    }

    render() {
        const tabStyle = { height: this.state.height };
        const contentStyle = { height: this.state.height - 50 };

        return (
            <React.Fragment>
                <Tabs fill={true} defaultActiveKey="bet" transition={false} id="bottom-tabs" className="Bet">
                    <Tab eventKey="bet" title="Bet" tabClassName="waves-effect waves-light">
                        <div id="settingColl">
                            <BottomTab mobile={true} />
                        </div>
                    </Tab>
                </Tabs>
            </React.Fragment>
        );
    }
}

export default BottomTab2;
