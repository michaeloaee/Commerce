import React, {Component} from 'react'

export default class Single extends Component {
    constructor(props) {
        super(props);
        this.state = {
            complete: false,
        };
        this.completed = this.completed.bind(this);
        this.close = this.close.bind(this);
    }

    close() {
        this.props.history.goBack();
        window.Vue.$children[0].synchroniseFromProduct();
    }

    completed() {
        this.setState({
            complete: true,
        });
    }

    render() {
        const prod = this.props.location.state.product;
        const completeClass = this.state.complete ? 'complete' : null;
        return (
            <div className="card">
                <div className={`card-content product ${completeClass}`}>

                    <div className="card-image">
                        <figure className="image">
                            <img src={prod.image} alt={prod.name} onLoad={this.completed}/>
                        </figure>
                    </div>

                    <div className="content">
                        <h2 className="title is-size-5">{prod.name}</h2>
                        <p className="subtitle description is-size-6">{prod.description}</p>
                    </div>

                    <i className="delete is-large" onClick={this.close}/>
                    <button className="button is-success">Купить</button>

                </div>
            </div>
        );
    }
}
