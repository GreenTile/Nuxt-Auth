<template>
	<section>
		<div class="content">
			<navbar></navbar>
			<div class="container-fluid px-0">
				<nuxt/>
			</div>
		</div>
	</section>
</template>

<script>
import Navbar from '../components/navbar'

export default {
	components: {
		Navbar
	}
}
</script>