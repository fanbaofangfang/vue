import Vue from 'vue';
import kvuex from './kvuex';

Vue.use(kvuex);

export default new kvuex.Store({
    state: {
        count: 1
    },
    mutations: {
        add(state, num) {
            state.count += num
        }
    }
})