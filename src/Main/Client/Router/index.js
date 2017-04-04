import React                                                        from 'react';
import { Router as ReactRouter, Route, IndexRoute, browserHistory } from 'react-router';
import { bindActionCreators }                                       from 'redux';
import { connect }                                                  from 'react-redux'

import Layout                                                       from 'layout';
import IdeasView                                                    from 'ideas';


export default class Router extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ReactRouter history={this.props.history}>
                <Route path="/" component={Layout}>
                    <IndexRoute component={IdeasView} />
		            <Route path='ideas' component={IdeasView} />
                </Route>
            </ReactRouter>
        );
    }
}
