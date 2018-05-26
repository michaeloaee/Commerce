require('./bootstrap');

import React from 'react'
import ReactDOM from 'react-dom'
import Master from './components/react/Master'

import Vue from 'vue'
import Menu from './components/vue/Menu'

if (document.getElementById('app')) {
    window.React = ReactDOM.render(<Master/>, document.getElementById('app'));
}

if (document.getElementById('categories-menu')) {
    Vue.component('categories-menu', Menu);
    new Vue({
        el: '#categories-menu',
    });
}
