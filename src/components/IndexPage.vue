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

<style lang="scss" scoped>
	.index-page {
		@include reset;

		display: flex;
		flex-flow: column;
		padding-bottom: 60px;
		min-height: 100vh;
		background-image: linear-gradient(135deg, #6039aa 0%, #32d6bd 100%);
	}

	.header {
		padding: 0.5rem 0;
		height: 60px;
		flex-shrink: 0;

		&__container {
			margin: 0 auto;
			padding: 0 1rem;
			display: flex;
			max-width: env(--desktop);
			height: 100%;
			align-items: center;
		}

		&__logo {
			@include reset;

			display: block;
			width: 99px;
			height: 29px;
			flex-shrink: 0;
			cursor: pointer;

			&-img {
				display: block;
				width: 100%;
				height: 100%;
			}
		}
	}

	.main {
		display: flex;
		flex-flow: column;
		flex-grow: 1;
	}

	.pay-section {
		margin: auto 0;
		padding: 60px 0;

		@media (width < env(--desktop)) {
			padding: 40px 0;
		}

		@media (width < env(--tablet)) {
			padding: 30px 0;
		}

		&__container {
			margin: 0 auto;
			display: flex;
			max-width: env(--desktop);

			@media (width < env(--desktop)) {
				flex-wrap: wrap;
			}
		}

		&__content-col {
			padding: 30px 1rem;
			flex-grow: 1;

			@media (width < env(--desktop)) {
				padding-top: 0;
				padding-bottom: 60px;
			}

			@media (width < env(--tablet)) {
				padding-bottom: 40px;
			}
		}

		&__form-col {
			padding: 0 1rem;
			flex-shrink: 0;
			max-width: 100%;

			@media (width < env(--desktop)) {
				display: flex;
				flex-grow: 1;
				justify-content: center;
			}
		}

		&__title {
			@include reset;

			margin-bottom: 40 / 48 * 1em;
			color: #ffffff;
			font-family: var(--content-font-family);
			font-size: 48px;
			line-height: 1.25;
			font-weight: 800;

			@media (width < env(--tablet)) {
				font-size: 24px;
			}
		}

		&__desc {
			@include reset;

			color: rgba(#ffffff, 0.6);
			font-family: var(--content-font-family);
			font-size: 21px;
			line-height: 1.25;

			@media (width < env(--tablet)) {
				font-size: 14px;
			}
		}
	}
</style>
