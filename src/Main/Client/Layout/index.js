import React from 'react';

import 'node_modules/semantic-ui-css/semantic.css';
import 'node_modules/semantic-ui-css/semantic';
import {Grid} from 'semantic-ui-react';
import './style.scss';

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid className="ui padded grid">
                <div id="main-container">
                    {this.props.children}
                </div>
            </Grid>
        );
    }
}
