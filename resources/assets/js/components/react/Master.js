import React, {Component} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'

import Category from './Category'
import SynchronizeRoute from './SynchronizeRoute'

export default class Master extends Component {
    disableRemote() {
        if (this.state.remote) {
            this.setState({
                remote: false,
            });
        }
    }

    componentDidUpdate() {
        this.disableRemote();
    }

    render() {
        let cat = (this.state || {}).categoryId,
            remote = (this.state || {}).remote;
        return (
            <Router>
                {cat &&
                <SynchronizeRoute
                    component={Category}
                    path={`/category/${cat}`}
                    remote={remote}
                />}
            </Router>
        );
    }
}
