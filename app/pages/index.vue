<template>
	<div>
		<navbar></navbar>
		<form @submit.prevent="send" action="">
			<input type="text" v-model="username"/>
			<input type="password" v-model="password"/>
			<input type="submit">
		</form>
		<span>{{token}}</span>
		
	</div>
</template>

<script>
import Navbar from '../components/navbar'

export default {
	data() {
		return {
			token: '',
			username: '',
			password: ''
		}
	},
	methods: {
		async send() {
			// this.token = await this.$axios.$post('auth/login', {
			// 	username: this.username,
			// 	password: this.password
			// });
			this.$store.dispatch('login', {
				username: this.username,
				password: this.password
			});
			this.username = '';
			this.password = '';
		}
	},
	components: {
		Navbar
	}
}
</script>

<style scoped>

</style>

