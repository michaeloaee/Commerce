import React, {Component} from 'react'

export default class Single extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.match.params.productId}</h1>
            </div>
        );
    }
}
