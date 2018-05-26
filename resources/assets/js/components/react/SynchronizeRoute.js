import React, {Component} from 'react'
import {
    Redirect,
    Route,
} from 'react-router-dom'

/**
 * Нужен для синхранизации с VueJs
 */
export default class SynchronizeRoute extends Component {
    render() {
        const {
            component: Component,
            path,
            remote,
        } = this.props;
        return (
            <Route
                render={props => {
                    const shouldRedirect = props.match.url === props.location.pathname,
                        pathname = remote ? path : props.location.pathname;
                    props.match.url = pathname;
                    return shouldRedirect ? (
                        <Redirect
                            to={{
                                pathname: pathname,
                                state: {from: props.location}
                            }}
                        />
                    ) : (
                        <Component {...props} />
                    );
                }}
            />
        );
    }
}
