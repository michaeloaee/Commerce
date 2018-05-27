import React, {Component} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {Route} from 'react-router-dom'

import SynchronizeRoute from './SynchronizeRoute'
import Category from './Category'
import ProductsList from './products/List'
import ProductSingle from "./products/Single";

export default class Master extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vueAction: false,
        };
    }

    /**
     * Отключаем связь с VueJs
     */
    disableVueAction() {
        this.setState({
            vueAction: false,
        });
    }

    /**
     * При прямом заходе на вложенную страницу категории, восстанавливаем ID
     */
    repairNestedRoute() {
        this.setState({
            categoryId: window.location.pathname.split('/').pop(),
        });
    }

    componentWillMount() {
        if (/\/category/.test(window.location.pathname)) {
            this.repairNestedRoute();
        }
    }

    componentDidUpdate() {
        if (this.state.vueAction) {
            this.disableVueAction();
        }
    }

    render() {
        const cat = this.state.categoryId,
            vueAction = this.state.vueAction;
        return (
            <Router>
                <div>
                    {cat &&
                    <SynchronizeRoute
                        component={Category}
                        path={`/category/${cat}`}
                        cat={cat}
                        vueAction={vueAction}
                    />}
                    {!cat &&
                    <Route path={"/category"}
                           render={(props) => <ProductsList {...props} cat={cat}/>}
                    />}
                    {!cat &&
                    <Route path={"/product/:productId"}
                           render={(props) => <ProductSingle {...props}/>}
                    />}
                </div>
            </Router>
        );
    }
}
