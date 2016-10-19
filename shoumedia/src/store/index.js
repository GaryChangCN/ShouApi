import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        login: true
    },
    mutations: {
        LOGOUT(state) {
            state.login = false
        },
        LOGIN(state) {
            state.login = true
        },
        USERNAME(state, username) {
            state.info.username = username
        }
    }
});

export default store;