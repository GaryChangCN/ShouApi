import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        login: false,
        username: null,
        password: null,
        md5: null,
        studentName: null,
        cookie: null,
        processBar: {
            process: null,
            hide: true
        }
    },
    mutations: {
        LOGOUT(state) {
            state.login = false;
            state.username = null;
            state.password = null;
            state.md5 = null;
            state.studentName = null;
            state.cookie = null;
            window.localStorage.removeItem('info');
        },
        LOGIN(state, value) {
            state.login = true
            state.username = value.username;
            state.password = value.password;
            state.md5 = value.md5;
            state.studentName = value.studentName;
            state.cookie = value.cookie
            window.localStorage.info = JSON.stringify(value);
        },
        PROCESSBARBEGIN(state, value) {
            state.processBar.hide = false;
            state.processBar.process = value + 'rem';
        },
        PROCESSBAREND(state) {
            state.processBar.process = '10rem';
        },
        PROCESSBARHIDE(state) {
            state.processBar.hide = true;
        }
    },
    actions: {
        loginFromLocal(ctx) {
            var tmp = localStorage.info;
            if (!!tmp) {
                var value = JSON.parse(window.localStorage.info);
                ctx.commit('LOGIN', value);
            }
        },
        processBegin(ctx) {
            var ran = ~~(Math.random() * 30).toFixed(2);
            var t = (ran + 2) / 10
            ctx.commit('SHOW');
            ctx.commit('BEGIN', t + 'rem');
        },
        processEnd(ctx) {
            ctx.commit('END');
            setTimeout(function() {
                ctx.commit('HIDE');
            }, 800);
        }
    }
});

export default store;