import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            complete: false,
        };
        this.completed = this.completed.bind(this);
    }

    static excerpt(str) {
        return str.substr(0, 100);
    }

    completed() {
        this.setState({
            complete: true,
        });
    }

    render() {
        const {prod} = this.props;
        const completeClass = this.state.complete ? 'complete' : null;
        return (
            <li key={prod.id}
                className={`column is-half category-item ${completeClass}`}
            >
                <div className="card">
                    <Link to={{
                        pathname: `/product/${prod.id}`,
                        state: {product: prod}
                    }}>
                        <div className="card-content">
                            <div className="card-image">
                                <figure className="image">
                                    <img src={prod.image} alt={prod.name} onLoad={this.completed}/>
                                </figure>
                            </div>
                            <br/>
                            <div className="content">
                                <h2 className="title is-size-5">{prod.name}</h2>
                                <p className="subtitle description is-size-6">{List.excerpt(prod.description)}</p>
                                <button className="button is-success is-outlined">Купить</button>
                            </div>
                        </div>
                    </Link>
                </div>
            </li>
        );
    }
}
