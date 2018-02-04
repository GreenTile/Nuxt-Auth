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
			console.log(user)
		},

		SET_TOKEN(state, token) {
			if(!token)
				return Cookies.removeItem('token');
			Cookies.setItem('token', token, {expires: 1/48});
		}
	},

	actions: {
		// nuxtServerInit({commit}, {req}) {
		// 	if (req.session && req.session.authUser) {
		// 		commit('SET_USER', req.session.authUser)
		// 	}
		// },


		async login({ commit, dispatch }, { username, password }) {
			try {
				const { token } = await this.$axios.$post('auth/login', { username, password })
				if(!token)
					throw new Error('Bad credentials');
				commit('SET_TOKEN', token)
				
				dispatch('fetch')
			} catch (error) {
				if (error.response && error.response.status === 401) {
					throw new Error('Bad credentials')
				}
				throw error
			}
		},

		async fetch({ commit }) {
			try {
				let { user } = (await this.$axios.get('auth/user')).data
				commit('SET_USER', user)
			} catch (error) {
				/*
				** Handles unauthrized attempt
				*/
				// TODO 
				dispatch('logout', { $axios }) // if data not found just log out destory user data
			}
		},
		
		async logout({ commit }) {
			await this.$axios.$post('auth/logout')
			commit('SET_TOKEN')
		},


	},

	getters: {
		isLogedIn: state => state.authUser !== null,
	}
});

export default store;