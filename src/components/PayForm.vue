<template lang="pug">
	.pay-form
		slot(:value="value")
</template>

<script>
	export default {
		name: 'PayForm',
		data() {
			return {
				value: 'Abricos',
			};
		},
	}
</script>

<style lang="scss">
</style>
