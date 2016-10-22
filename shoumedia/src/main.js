import Vue from 'vue';
import Element from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import './assets/iconfont.css'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import store from './store'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Element);


import App from './App';
import Hello from './components/Hello';
import Picker from './components/datepicker';
import Index from './components/Index'
import Login from './components/Login';
import Card from './components/Card';
import Class from './components/Class';
import Score from './components/Score';
import Gpa from './components/Gpa';
import Address from './components/Address';


const router = new VueRouter({
    mode: 'history',
    routes: [{
        name: 'index',
        path: '/',
        component: Index
    }, {
        path: '/login',
        name: 'login',
        component: Login
    }, {
        name: 'card',
        path: '/card',
        component: Card
    }, {
        name: 'class',
        path: '/class',
        component: Class
    }, {
        name: 'score',
        path: '/score',
        component: Score
    }, {
        name: 'gpa',
        path: '/gpa',
        component: Gpa
    }, {
        name: 'address',
        path: '/address',
        component: Address
        // }, {
        //     name: 'news',
        //     path: '/news',
        //     component: News
        // }, {
        //     name: 'xszc',
        //     path: '/xszc',
        //     component: Xszc
        // }, {
        //     name: 'car',
        //     path: '/car',
        //     component: Car
        // }, {
        //     name: 'lost',
        //     path: '/lost',
        //     component: Lost
        // }, {
        //     name: 'tree',
        //     path: '/tree',
        //     component: Tree
        // }, {
        //     name: 'help',
        //     path: '/help',
        //     component: Help
        // }]
    }]
});

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});

(function () {
    function setRem() {
        var width = document.documentElement.clientWidth ? document.documentElement.clientWidth : window.innerWidth;
        var rem = width / 10;
        document.querySelector("html").style.fontSize = rem + "px";
    }
    setRem();
    window.addEventListener("resize", function () {
        setRem();
    });
} ())