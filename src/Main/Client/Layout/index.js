import React from 'react';
import { Grid, Header, Icon} from 'semantic-ui-react';

import 'node_modules/semantic-ui-css/semantic.css';
import 'node_modules/semantic-ui-css/semantic';
import './style.scss';

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="ui padded">                
                <div className='app-header'>
                    <Header as='h2'>
                        <Icon.Group size='large' color='blue'>
                        <Icon name='cloud' />
                        <Icon corner name='idea' size='tiny' />
                        </Icon.Group>
                        Idea/Memo Board
                    </Header>
                </div>
                <div id="main-container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
