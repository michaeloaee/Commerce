import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        }
    }

    read(cat) {
        axios.get(`/api/category/${cat}/products/`)
            .then((data) => {
                try {
                    this.setState({
                        products: data.data,
                    });
                } catch (e) {
                    console.log(data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentWillMount() {
        const cat = this.props.cat || window.location.pathname.split('/').pop();
        this.read(cat);
    }

    render() {
        return (
            <ul className="wrap_category-list">
                {this.state.products.map(prod => (
                    <li key={prod.id}>
                        <Link to={{
                            pathname: `/product/${prod.id}`,
                            state: {product: prod}
                        }}>

                            <img src={prod.image} alt={prod.name}/>
                            <div>{prod.name}</div>

                        </Link>
                    </li>
                ))}
            </ul>
        );
    }
}
