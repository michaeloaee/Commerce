import React, {Component} from 'react'
import {Route} from 'react-router-dom'

import ProductsList from './products/List'
import Product from './products/Single'

export default class Category extends Component {
    render() {
        return (
            <div className="wrap_category">
                <Route path={"/category"} component={ProductsList}/>
                <Route path={"/product/:productId"} component={Product}/>
            </div>
        );
    }
}
