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
					:valid-feedback="passwordValidFeedback"
					:invalid-feedback="passwordInvalidFeedback"
					label-for="passwordInput">
				<b-form-input id="passwordInput"
						type="password"
						v-model="form.password"
						required
						@change="computePasswordState"
						:state="passwordState"
						placeholder="Enter password">
				</b-form-input>
				<b-form-input id="reenteredPasswordInput"
						class="mt-1"
						type="password"
						v-model="reenteredPass"
						required
						@change="computePasswordState"
						:state="passwordState"
						placeholder="Reenter password">
				</b-form-input>
			</b-form-group>

			<b-form-group id="nameGroup"
					label="Your Name:"
					label-for="nameInput"
					:invalid-feedback="nameInvalidFeedback"
					:valid-feedback="nameValidFeedback"
					:state="nameState">
				<b-form-input id="nameInput"
						type="text"
						v-model.trim="form.name"
						required
						@change="computeNameState"
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
						:state="emailState"
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
      emailState: "",
      usernameState: "",
      passwordState: "",
      nameState: "",
      reenteredPass: "",
      form: {
        email: "",
        username: "",
        password: "",
        name: ""
      }
    };
  },
  methods: {
    onReset() {
      this.emailState = "";
      this.usernameState = "";
      this.passwordState = "";
      this.nameState = "";
      this.reenteredPass = "";
      this.form.email = "";
      this.form.username = "";
      this.form.password = "";
      this.form.name = "";
    },
    onSubmit() {},
    async computeEmailState() {
      this.emailState = "";
      if (this.form.email.length == 0) {
        this.emailState = false;
        return;
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
      this.usernameState = "";
      if (this.form.username.length < 6) {
        this.usernameState = false;
        return;
      }

      let res = await this.$axios.$post("auth/signup/check", {
        username: this.form.username
      });
      this.usernameState = res;
    },
    computePasswordState() {
      this.passwordState = "";

      if (this.form.password != this.reenteredPass) {
        this.passwordState = false;
        return;
      }

      if (this.form.password.length == 0) {
        this.passwordState = false;
        return;
      }
      var re = /^\w+$/;
      if (this.form.password.length < 6) {
        console.log("= /^w+$/");
        this.passwordState = false;
        return;
      }
      re = /[0-9]/;
      if (!re.test(this.form.password)) {
        console.log("0-9]/");
        this.passwordState = false;
        return;
      }
      re = /[a-z]/;
      if (!re.test(this.form.password)) {
        console.log("a-z]/");
        this.passwordState = false;
        return;
      }
      re = /[A-Z]/;
      if (!re.test(this.form.password)) {
        console.log("A-Z]/");
        this.passwordState = false;
        return;
      }
      this.passwordState = true;
    },
    computeNameState() {
      if (this.form.name.length < 5) {
        this.nameState = false;
      } else {
        this.nameState = true;
      }
    }
  },
  computed: {
    isLogedIn() {
      return this.$store.getters.isLogedIn;
    },
    emailInvalidFeedback() {
      if (this.form.email.length == 0) {
        return "Enter you email address!";
      }

      var x = this.form.email;
      var atpos = x.indexOf("@");
      var dotpos = x.lastIndexOf(".");
      if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
        return "Email address is incorect!";
      }
      return "This email address is already registered!";
    },
    emailValidFeedback() {
      return "This email address is available!";
    },
    usernameInvalidFeedback() {
      if (this.form.username.length < 6) {
        return "Username is too short!";
      }
      return "This username is already taken!";
    },
    usernameValiFeedback() {
      return "This username is available";
    },
    passwordValidFeedback() {
      return "";
    },
    passwordInvalidFeedback() {
      if (this.form.password != this.reenteredPass) {
        return "Passwords don't match!";
      }
      if (this.form.password.length == 0) {
        return "Please enter your password!";
      }
      var re = /^\w+$/;
      if (this.form.password.length < 6) {
        return "Password is too short";
      }
      re = /[0-9]/;
      if (!re.test(this.form.password)) {
        return "Password must contain at least on digit!";
      }
      re = /[a-z]/;
      if (!re.test(this.form.password)) {
        return "Password must contain at least one lowercase letter!";
      }
      re = /[A-Z]/;
      if (!re.test(this.form.password)) {
        return "Password must contain at least one uppercase letter!";
      }
    },
    nameValidFeedback() {
      return "";
    },
    nameInvalidFeedback() {
      return "You name is too short!";
    }
  }
};
</script>

<style scoped>
input {
  margin-left: 0.5rem;
}
</style>
