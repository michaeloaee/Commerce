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
            cat,
            component: Component,
            path,
            vueAction,
        } = this.props;
        return (
            <Route
                render={props => {
                    const shouldRedirect = props.match.url === props.location.pathname,
                        pathname = vueAction ? path : props.location.pathname; // Подменяем, когда существует связь с VueJs
                    props.match.url = pathname;
                    return shouldRedirect ? (
                        <Redirect
                            to={{
                                pathname: pathname,
                                state: {from: props.location}
                            }}
                        />
                    ) : (
                        <Component {...props} cat={cat}/>
                    );
                }}
            />
        );
    }
}
