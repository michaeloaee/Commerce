import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class List extends Component {
    render() {
        return (
            <ul className="wrap_category-list">
                <li>
                    <Link to={`/product/p1`}> Product 1</Link>
                </li>
                <li>
                    <Link to={`/product/p2`}> Product 2</Link>
                </li>
                <li>
                    <Link to={`/product/p3`}> Product 3</Link>
                </li>
            </ul>
        );
    }
}
