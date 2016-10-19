import Vue from 'vue';
import Element from 'element-ui';
import 'element-ui/lib/theme-default/index.css'
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

const router = new VueRouter({
    mode: 'history',
    routes: [{
        path: '/',
        component: Index
    }, {
        path: '/picker',
        component: Picker
    }, {
        path: '/login',
        name: 'login',
        component: Login
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