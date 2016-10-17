import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import VueProgressBar from 'vue-progressbar'

Vue.use(VueProgressBar, {
    color: 'rgb(113,107,95)',
    failedColor: 'red',
    height: '3px'
})

import App from './App.vue';
import Index from './components/Index.vue';
import World from './components/world.vue';

const router = new VueRouter({
    mode: 'history',
    routes: [{
        path: '/world',
        component: World
    }, {
        path: '/',
        component: Index
    }]
});


new Vue({
    el: '#app',
    router,
    render: h => h(App)
});

(function() {
    function setRem() {
        var width = document.documentElement.clientWidth ? document.documentElement.clientWidth : window.innerWidth;
        var rem = width / 10;
        document.querySelector("html").style.fontSize = rem + "px";
    };
    setRem();
    window.addEventListener("resize", function() {
        setRem();
    });
}());