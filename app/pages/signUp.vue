<template>
	<b-container>
		<b-card class="mt-5">
			<b-row>
				<sign-up-form></sign-up-form>
			</b-row>
		</b-card>
	</b-container>
		
</template>

<script>
import SignUpForm from '../components/signUpForm'

export default {
	components: {
		SignUpForm
	}
}
</script>

<style scoped>

</style>
