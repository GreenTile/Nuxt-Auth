<template>
	<b-container class="mt-4">
		<b-form @submit="onSubmit" @reset="onReset" v-if="!isLogedIn">

			<b-form-group id="usernameGroup"
					label="Username:"
					:state="usernameState"
					:invalid-feedback="usernameInvalidFeedback"
					:valid-feedback="usernameValiFeedback"
					label-for="usernameInput">
				<b-form-input id="usernameInput"
						type="text"
						v-model="form.username"
						@change="computeUsernameState"
						required
						:state="usernameState"
						placeholder="Enter username">
				</b-form-input>
			</b-form-group>

			<b-form-group id="passwordGroup"
					label="Password"
					:state="passwordState"
					label-for="passwordInput">
				<b-form-input id="passwordInput"
						type="password"
						v-model="form.password"
						required
						:state="passwordState"
						placeholder="Enter password">
				</b-form-input>
				<b-form-input id="reenteredPasswordInput"
						class="mt-1"
						type="password"
						v-model="reenteredPass"
						required
						:state="passwordState"
						placeholder="Reenter password">
				</b-form-input>
			</b-form-group>

			<b-form-group id="nameGroup"
					label="Your Name:"
					label-for="nameInput"
					:state="nameState">
				<b-form-input id="nameInput"
						type="text"
						v-model="form.name"
						required
						:state="nameState"
						placeholder="Enter name">
				</b-form-input>
			</b-form-group>

			<b-form-group id="emailGroup"
					label="Email address:"
					label-for="emailInput"
					:state="emailState"
					:invalid-feedback="emailInvalidFeedback"
					:valid-feedback="emailValidFeedback"
					description="Your email address will be safe with us.">
				<b-form-input id="emailInput"
						type="email"
						v-model="form.email"
						@change="computeEmailState"
						required
						placeholder="Enter email">
				</b-form-input>
			</b-form-group>

			<b-button type="submit" variant="primary">Submit</b-button>
			<b-button class="ml-2" type="reset" variant="danger">Reset</b-button>
		</b-form>
	</b-container>
</template>

<script>

export default {
	data() {
		return {
			emailState: '',
			usernameState: '',
			passwordState: '',
			nameState: '',
			reenteredPass: '',
			form: {
				email: '',
				username: '',
				password: '',
				name: ''
			}
		};
	},
	methods: {
		onReset() {
			this.form.email = this.form.username = this.form.name
		},
		onSubmit() {},
		async computeEmailState() {
			this.emailState = '';
			if (this.form.email.length == 0) {
				this.emailState = false;
				return ;
			}

			let x = this.form.email;
			let atpos = x.indexOf("@");
			let dotpos = x.lastIndexOf(".");
			if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
				this.emailState = false;
				return;
			}

			let res = await this.$axios.$post("auth/signup/check", {
				email: this.form.email
			});

			this.emailState = res;
		},
		async computeUsernameState() {
			this.usernameState = '';
			if(this.form.username.length < 6) {
				this.usernameState = false;
				return;
			}

			let res = await this.$axios.$post("auth/signup/check", {
				username: this.form.username
			});
			this.usernameState = res;
		}
	},
	computed: {
		isLogedIn() {
			return this.$store.getters.isLogedIn;
		},
		emailInvalidFeedback() {
			if(this.form.email.length == 0) {
				return 'Enter you email address!';
			}

			var x = this.form.email;
			var atpos = x.indexOf("@");
			var dotpos = x.lastIndexOf(".");
			if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
				return 'Email address is incorect!';
			}
			return 'This email address is already registered!';
		},
		emailValidFeedback() {
			return 'This email address is available!';
		},
		usernameInvalidFeedback() {
			if(this.form.username.length < 6) {
				return 'Username is too short!';
			}
			return 'This username is already taken!';
		},
		usernameValiFeedback() {
			return 'This username is available';
		}
	}
};
</script>

<style scoped>
	input {
		margin-left: 0.5rem;
	}
</style>
