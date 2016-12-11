import Vue from 'vue';

import VueRouter from 'vue-router';
import store from './store'
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueRouter);
Vue.use(VueAxios, axios);



const App = resolve => require(['./App.vue'], resolve);



const router = new VueRouter({
    mode: 'history',
    // routes: [{
    //     name: 'index',
    //     path: '/',
    //     component: Index
    // }
    // }]
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