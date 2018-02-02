<template>
	<b-container class="mt-4">
		<b-form @submit="onSubmit" @reset="onReset" v-if="!isLogedIn">

			<b-form-group id="emailGroup"
					label="Email address:"
					label-for="emailInput"
					description="Your email address will be safe with us.">
				<b-form-input @change="cc" id="emailInput"
						type="email"
						v-model="form.email"
						required
						placeholder="Enter email">
				</b-form-input>
			</b-form-group>
			{{dd}}
			<b-form-group id="usernameGroup"
					label="Username:"
					label-for="usernameInput">
				<b-form-input id="usernameInput"
						type="text"
						v-model="form.email"
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
			dd: '',
			form: {

			}
		}
	},
	methods: {
		onReset() {

		},
		onSubmit() {

		},
		cc(e) {
			console.log(e);
		}
	},
	computed: {
		isLogedIn() {
			return this.$store.getters.isLogedIn;
		}
	}
};
</script>

<style scoped>

</style>
