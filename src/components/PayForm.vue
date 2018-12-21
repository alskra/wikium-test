<template lang="pug">
	form.pay-form(action="/")
		.card
			.__front
				.__types

				.__field-row
					.__field-col
						label.__field-label(for="number") номер карты

						input.__field-input(
							id="number"
							name="number"
							ref="number"
							type="tel"
							autofocus
						)

				.__field-row
					.__field-col
						label.__field-label(for="owner") имя владельца

						input.__field-input(
							id="owner"
							name="owner"
							ref="owner"
							type="text"
						)

					.__field-col.--expiry
						label.__field-label(for="expiry") срок действия

						input.__field-input(
							id="expiry"
							name="expiry"
							ref="expiry"
							type="tel"
							maxlength="7"
						)

			.__back
				.__field-row.--cvc
					.__field-col.--cvc
						label.__field-label(for="cvc") cvc

						input.__field-input(
							id="cvc"
							name="cvc"
							ref="cvc"
							type="tel"
							autocomplete="off"
						)

					.__field-desc.--cvc Три цифры с&nbsp;оборотной стороны
</template>

<script>
	import payform from 'payform';

	export default {
		name: 'PayForm',
		data() {
			return {};
		},
		mounted() {
			payform.cardNumberInput(this.$refs.number);
			payform.expiryInput(this.$refs.expiry);
			payform.cvcInput(this.$refs.cvc);
		}
	}
</script>

<style lang="scss" scoped>
	.pay-form {
		@include reset;

		padding: 30px 45px;
		width: 625px;
		max-width: 100%;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
		border-radius: 4px;
		background-color: #ffffff;

		@media (width < env(--tablet)) {
			padding-left: 15px;
			padding-right: 15px;
		}
	}

	.card {
		display: flex;
		justify-content: space-between;

		@media (width < env(--tablet)) {
			flex-flow: column;
			justify-content: flex-start;
			align-items: center;
		}

		&__front {
			position: relative;
			z-index: 1;
			padding: 14px 23px 29px;
			width: 391px;
			height: 233px;
			max-width: 100%;
			box-shadow: 8px 8px 15px rgba(0, 0, 0, 0.1);
			border-radius: 8px;
			border: 1px solid #e6e6e6;
			background-color: #f1f0f9;

			@media (width < env(--tablet)) {
				padding-left: 14px;
				padding-right: 14px;
			}
		}

		&__back {
			margin: 36px 0 0 -391px;
			padding: 23px 23px 29px;
			width: 391px;
			height: 233px;
			max-width: 100%;
			border-radius: 8px;
			border: 1px solid #e6e6e6;
			background-color: #e7e6f4;

			@media (width < env(--tablet)) {
				display: flex;
				flex-flow: column;
				padding-left: 14px;
				padding-right: 14px;
			}

			&::before {
				content: '';
				display: block;
				margin: 0 -24px 10px;
				height: 50px;
				background-color: #b49ed6;

				@media (width < env(--tablet)) {
					margin: 0 -15px auto;
				}
			}

			@media (width < env(--tablet)) {
				margin: -233px + 99px 0 0;
			}
		}

		&__types {
			margin: 0 0 23px auto;
			width: 154px;
			height: 26px;
			background: url("../assets/img/card-types.png") no-repeat 50% 50% / contain;
		}

		&__field {
			&-row {
				margin: 0 -8px;
				display: flex;

				&:not(:last-child) {
					margin-bottom: 20px;
				}

				&--cvc {
					margin-left: auto;
					width: 112px;
					flex-flow: column;

					@media (width < env(--tablet)) {
						margin-left: -8px;
						width: auto;
						flex-flow: row;
						align-items: center;
					}
				}
			}

			&-col {
				padding: 0 8px;
				min-width: 0;
				max-width: 100%;
				flex-grow: 1;

				&--expiry {
					width: 116px;
					flex: 0 0 auto;
				}

				&--cvc {
					@media (width < env(--tablet)) {
						width: 112px;
						flex: 0 0 auto;
						align-self: flex-end;
					}
				}
			}

			&-label {
				@include reset;

				margin-bottom: 6px;
				color: #999999;
				font-size: 10px;
				line-height: 14px;
				font-weight: 700;
				text-transform: uppercase;
				letter-spacing: 1px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				cursor: pointer;
			}

			&-input {
				@include reset;

				padding: (40px - 2px - 14px * 1.25) / 2 10px;
				width: 100%;
				font-size: 14px;
				line-height: 1.25;
				border-radius: 4px;
				border: 1px solid #cccccc;
				background-color: #ffffff;
				transition-property: color,
				border-color,
				background-color;
				transition-duration: 0.15s;
				transition-timing-function: ease-in-out;

				&::placeholder {
					color: #999999;
					opacity: 1;
				}

				&:focus-visible {
					outline: 0;
					border-color: #b49ed6;
				}
			}

			&-desc {
				color: #999999;
				font-family: var(--content-font-family);
				font-size: 12px;
				line-height: 1.25;
				user-select: none;

				&--cvc {
					margin-top: 6px;
					padding: 0 8px;

					@media (width < env(--tablet)) {
						margin-top: 20px;
					}
				}
			}
		}
	}
</style>
