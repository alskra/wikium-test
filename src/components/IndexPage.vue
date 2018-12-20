<template lang="pug">
</template>

<script>
	import PayForm from './PayForm';

	export default {
		name: 'IndexPage',
		components: {
			PayForm,
		},
	}
</script>

<style lang="scss">
	:root {
		--index-page-container-max-width: 1132px;
	}

	.index-page {
		@include reset;

		display: flex;
		flex-flow: column;
		min-height: 100vh;
		background-image: linear-gradient(135deg, #6039aa 0%, #32d6bd 100%);

		.container {
			max-width: var(--index-page-container-max-width);
		}
	}
</style>

<style lang="scss" scoped>
	.header {
		padding: 0.5rem 0;
		height: 60px;

		&__container {
			display: flex;
			height: 100%;
			align-items: center;
		}
	}

	.logo {
		@include reset;

		display: block;
		width: 99px;
		height: 29px;
		cursor: pointer;

		&__img {
			display: block;
			width: 100%;
			height: 100%;
		}
	}

	.pay-section {
		margin-top: 60px;

		&__title {
			@include reset;

			margin-bottom: 40 / 48 * 1em;
			color: #ffffff;
			font-family: var(--content-font-family);
			font-size: 48px;
			line-height: 1.25;
			font-weight: 800;
		}

		&__desc {
			@include reset;

			color: rgba(#ffffff, 0.6);
			font-family: var(--content-font-family);
			font-size: 21px;
			line-height: 1.25;
		}
	}
</style>
