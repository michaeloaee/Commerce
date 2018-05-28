require('./bootstrap');

import React from 'react'
import ReactDOM from 'react-dom'
import Master from './components/react/Master'

import Vue from 'vue'
import Menu from './components/vue/Menu'
import store from './components/vue/store';

if (document.getElementById('app')) {
    window.React = ReactDOM.render(<Master/>, document.getElementById('app'));
}

if (document.getElementById('categories-menu')) {
    Vue.component('categories-menu', Menu);
    window.Vue = new Vue({
        el: '#categories-menu',
        store,
    });
}
