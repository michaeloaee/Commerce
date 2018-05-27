import React, {Component} from 'react'
import {Route} from 'react-router-dom'

import ProductsList from './products/List'
import ProductSingle from './products/Single'

export default class Category extends Component {
    render() {
        return (
            <div className="wrap_category">
                <Route path={"/category"}
                       render={(props) => <ProductsList {...props} cat={this.props.cat}/>}
                />
                <Route path={"/product/:productId"}
                       component={ProductSingle}
                />
            </div>
        );
    }
}
