import React, {Component} from 'react'

import Item from './Item'

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
            <ul className="columns is-multiline">
                {this.state.products.map(prod => <Item key={prod.id} prod={prod}/>)}
            </ul>
        );
    }
}
