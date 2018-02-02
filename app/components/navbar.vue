<template>
	<b-navbar toggleable="md" type="dark" variant="info">

		<b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

		<b-navbar-brand href="#">Nav</b-navbar-brand>

		<b-collapse is-nav id="nav_collapse">

			<b-navbar-nav>
				<b-nav-item href="#">Link</b-nav-item>
				<b-nav-item href="#" disabled>Disabled</b-nav-item>
			</b-navbar-nav>

			<!-- Right aligned nav items -->
			<b-navbar-nav v-if="isLogedIn" class="ml-auto" no-caret>
				<b-nav-item-dropdown right offset="20" class="dropdown-margin m-2" size="lg" left text="User">
					<!-- Using button-content slot -->
					<template class="icon-container" slot="button-content">
						<b-img class="full-height" rounded="circle" src="http://www.spurlock.illinois.edu/img/people/generic_800.png" fluid></b-img>
						<span></span>
					</template>
					<b-dropdown-item>Profile</b-dropdown-item>
					<b-dropdown-item href="#">Signout</b-dropdown-item>
				</b-nav-item-dropdown>
			</b-navbar-nav>

			<b-navbar-nav v-else class="ml-auto">
				<b-nav-item href="#">Login</b-nav-item>
				<b-nav-item href="/signUp" >Sign Up</b-nav-item>
			</b-navbar-nav>

		</b-collapse>
	</b-navbar>
</template>

<script>
export default {
	data() {
		return {
		}
	},
	methods: {
	},
	computed: {
		isLogedIn() {
			return this.$store.getters.isLogedIn;
		}
	}
};
</script>

<style scoped>
.full-height {
	position: absolute;
	height: auto;
	max-height: 100%;
}

.icon-container {
	position: absolute;
	height: auto;
	max-height: 100%;
	float: inherit;
	width: auto;
}

.dropdown-margin {
	margin-right: 100px;
}
</style>
