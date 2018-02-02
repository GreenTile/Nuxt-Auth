<template>
	<b-container class="mt-4">
		<b-form @submit="onSubmit" @reset="onReset" v-if="!isLogedIn">

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
						placeholder="Enter username">
				</b-form-input>
			</b-form-group>

			<b-form-group id="exampleInputGroup2"
					label="Your Name:"
					label-for="exampleInput2">
				<b-form-input id="exampleInput2"
						type="text"
						v-model="form.name"
						required
						placeholder="Enter name">
				</b-form-input>
			</b-form-group>

			<b-form-group id="exampleGroup4">
				<b-form-checkbox-group v-model="form.checked" id="exampleChecks">
					<b-form-checkbox value="me">Check me out</b-form-checkbox>
					<b-form-checkbox value="that">Check that out</b-form-checkbox>
				</b-form-checkbox-group>
			</b-form-group>
			<b-button type="submit" variant="primary">Submit</b-button>
			<b-button type="reset" variant="danger">Reset</b-button>
		</b-form>
	</b-container>
</template>

<script>

export default {
	data() {
		return {
			emailState: '',
			usernameState: '',
			form: {
				email: '',
				username: ''
			}
		};
	},
	methods: {
		onReset() {},
		onSubmit() {},
		async computeEmailState() {
			this.emailState = false;
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
			this.usernameState = false;
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
			return 'This username is already taken!';
		},
		usernameValiFeedback() {
			return 'This username is available';
		}
	}
};
</script>

<style scoped>

</style>
