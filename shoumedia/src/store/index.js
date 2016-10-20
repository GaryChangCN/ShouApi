import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        login: false,
        username: null,
        password: null,
        md5: null,
        studentName: null
    },
    mutations: {
        LOGOUT(state) {
            state.login = false;
            state.username = null;
            state.password = null;
            state.md5 = null;
            state.studentName = null;
            window.localStorage.removeItem('info');
        },
        LOGIN(state, value) {
            state.login = true
            state.username = value.username;
            state.password = value.password;
            state.md5 = value.md5;
            state.studentName = value.studentName;
            window.localStorage.info = JSON.stringify(value);
        }
    },
    actions: {
        loginFromLocal(ctx) {
            var tmp = localStorage.info;
            if (!!tmp) {
                var value = JSON.parse(window.localStorage.info);
                ctx.commit('LOGIN', value);
            }
        }
    }
});

export default store;