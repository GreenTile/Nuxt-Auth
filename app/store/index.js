import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

require('whatwg-fetch');

const store = () => new Vuex.Store({
	state: {
		authUser: null
	},

	mutations: {
		SET_USER(state, user) {
			state.authUser = user
		}
	},

	actions: {

	}
});

export default store;