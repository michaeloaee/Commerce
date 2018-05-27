import React, {Component} from 'react'

export default class Single extends Component {
    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
    }

    close() {
        this.props.history.goBack();
    }

    render() {
        const prod = this.props.location.state.product;
        return (
            <div>

                <button onClick={this.close}>Close</button>

                <h1>{prod.name}</h1>

                <img src={prod.image} alt={prod.name}/>
                <div>{prod.description}</div>

            </div>
        );
    }
}
