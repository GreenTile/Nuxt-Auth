import Vue from 'vue';
import Vuex from 'vuex';

import Cookies from 'js-cookies'

Vue.use(Vuex);

require('whatwg-fetch');

const store = () => new Vuex.Store({
	state: {
		authUser: null,

	},

	mutations: {
		SET_USER(state, user) {
			state.authUser = user
		},

		SET_TOKEN(state, token) {
			if(!token)
				return Cookies.remove('token');
			Cookies.set('token', token, {expires: 1/48});
		}
	},

	actions: {
		// nuxtServerInit({commit}, {req}) {
		// 	if (req.session && req.session.authUser) {
		// 		commit('SET_USER', req.session.authUser)
		// 	}
		// },


		async login({ commit }, { username, password }) {
			try {
				const { token } = await this.$axios.$post('auth/login', { username, password })
				if(!token)
					throw new Error('Bad credentials');
				commit('SET_USER', token)
			} catch (error) {
				if (error.response && error.response.status === 401) {
					throw new Error('Bad credentials')
				}
				throw error
			}
		},
		
		async logout({ commit }) {
			await this.$axios.$post('auth/logout')
			commit('SET_USER', null)
		},


	},

	getters: {
		isLogedIn: state => state.authUser !== null,
	}
});

export default store;