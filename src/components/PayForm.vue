<template lang="pug">
	form.pay-form(
		action="/"
		novalidate
	)
		.card(
			:data-card-type="validObj.cardType"
			:data-valid="String(checkValid())"
		)
			.__front
				.__types
					.__type-item(
						v-for="typeItem in allowedCardTypes"
						:key="typeItem.id"
						:class="{'card__type-item--active': typeItem.name === validObj.cardType}"
						:title="typeItem.title"
					)
						base-icon.__type-item-icon(
							:name="typeItem.name"
							:width="null"
							:height="null"
						)
				.__field-row
					.__field-col
						label.__field-label(for="card-number") номер карты

						input.__field-input(
							id="card-number"
							name="card-number"
							ref="cardNumber"
							type="tel"
							autocomplete="cc-number"
							autofocus
							tabindex="1"
							@input="onCardNumberInput"
							@keypress="onCardNumberInput"
						)

				.__field-row
					.__field-col
						label.__field-label(for="card-owner") имя владельца

						input.__field-input(
							id="card-owner"
							name="card-owner"
							ref="cardOwner"
							type="text"
							autocomplete="cc-name"
							required
							tabindex="2"
							@input="onCardOwnerInput"
							@keypress="onCardOwnerInput"
						)

					.__field-col.--expiry
						label.__field-label(for="card-expiry") срок действия

						input.__field-input(
							id="card-expiry"
							name="card-expiry"
							ref="cardExpiry"
							type="tel"
							autocomplete="cc-exp"
							maxlength="7"
							placeholder="ММ / ГГ"
							tabindex="3"
							@input="onCardExpiryInput"
							@keypress="onCardExpiryInput"
						)

			.__back
				.__field-row.--cvc
					.__field-col.--cvc
						label.__field-label(for="card-cvc") cvc

						input.__field-input(
							id="card-cvc"
							name="card-cvc"
							ref="cardCVC"
							type="tel"
							autocomplete="off"
							tabindex="4"
							@input="onCardCVCInput"
							@keypress="onCardCVCInput"
						)

					.__field-desc.--cvc Три цифры с&nbsp;оборотной стороны

		.footer
			.__actions-row
				.__info-col
					.info
						base-icon.__icon(
							name="lock"
							:width="null"
							:height="null"
						)
						.__body.
								Мы не&nbsp;храним ваши данные, а&nbsp;сразу
								передаем их по&nbsp;зашифрованному
								каналу платежной системе
				.__button-col
					button.btn-default(
						type="submit"
						:disabled="!checkValid()"
					)
						base-icon.__icon(
							name="lock"
							:width="null"
							:height="null"
						)

						span.__label ОПЛАТИТЬ 60 ₽

			.__other-row.content
				a(href="/") Все способы оплаты
</template>

<script>
	import payform from 'payform';

	export default {
		name: 'PayForm',
		data() {
			return {
				allowedCardTypes: [
					{
						id: 1,
						name: 'mastercard',
						title: 'MasterCard',
					},
					{
						id: 2,
						name: 'maestro',
						title: 'Maestro',
					},
					{
						id: 3,
						name: 'visa',
						title: 'Visa',
					},
				],
				validObj: {
					cardType: null,
				},
			};
		},
		mounted() {
			payform.cardNumberInput(this.$refs.cardNumber);
			payform.expiryInput(this.$refs.cardExpiry);
			payform.cvcInput(this.$refs.cardCVC);
		},
		methods: {
			toggleValidClass(input, status) {
				input.classList.toggle('invalid', !status);
			},
			goToNextInput(currentInput) {
				const currentTabindex = +currentInput.getAttribute('tabindex'),
					nextInput = document.querySelector(`input[tabindex='${currentTabindex + 1}']`);

				if (nextInput) {
					nextInput.focus();
				}
			},
			updateCardType(input) {
				this.validObj.cardType = payform.parseCardType(input.value);
				this.validateCardCVC(this.$refs.cardCVC);
			},
			// cardNumber
			validateCardNumber(input) {
				this.$set(this.validObj, 'cardNumber', payform.validateCardNumber(input.value));
				this.toggleValidClass(input, this.validObj.cardNumber);
			},
			onCardNumberInput(evt) {
				const input = evt.target;

				this.updateCardType(input);
				this.validateCardNumber(input);

				if (input.value.length === 23) {
					this.goToNextInput(input);
				}
			},
			// cardOwner
			validateCardOwner(input) {
				this.$set(this.validObj, 'cardOwner', input.validity.valid);
				this.toggleValidClass(input, this.validObj.cardOwner);
			},
			onCardOwnerInput(evt) {
				const input = evt.target;

				input.value = input.value.replace(/[^a-zA-Z-]/g, '');
				this.validateCardOwner(input);
			},
			// cardExpiry
			validateCardExpiry(input) {
				const cardExpiryObj = payform.parseCardExpiry(input.value);

				this.$set(this.validObj, 'cardExpiry', payform.validateCardExpiry(cardExpiryObj));
				this.toggleValidClass(input, this.validObj.cardExpiry);
			},
			onCardExpiryInput(evt) {
				const input = evt.target;

				this.validateCardExpiry(input);

				if (input.value.length === 7) {
					this.goToNextInput(input);
				}
			},
			// cardCVC
			validateCardCVC(input) {
				this.$set(this.validObj, 'cardCVC', payform.validateCardCVC(input.value, this.validObj.cardType));
				this.toggleValidClass(input, this.validObj.cardCVC);
			},
			onCardCVCInput(evt) {
				const input = evt.target;

				this.validateCardCVC(input);

				if (input.value.length === 4) {
					this.goToNextInput(input);
				}
			},
			checkValid() {
				return Object.values(this.validObj).every(Boolean)
					&& this.allowedCardTypes.map(typeItem => typeItem.name).indexOf(this.validObj.cardType) !== -1;
			},
		},
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
			padding: 13px 23px 29px;
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
			display: flex;
			justify-content: flex-end;
			margin: 0 -4px 13px;
		}

		&__type-item {
			margin: 0 4px;
			flex-shrink: 0;
			opacity: 0.5;
			transition: opacity 0.15s ease-in-out;

			&-icon {
				display: block;
				width: auto;
				height: 36px;
			}

			&--active {
				opacity: 1;
			}
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
				height: 40px;
				font-size: 14px;
				line-height: 1.25;
				border-radius: 4px;
				border: 1px solid #cccccc;
				background-color: #ffffff;
				transition-property:
					color,
					border-color,
					background-color,
					box-shadow;
				transition-duration: 0.15s;
				transition-timing-function: ease-in-out;

				&::placeholder {
					color: #999999;
					opacity: 1;
				}

				&:focus-visible {
					outline: 0;
					border-color: #b49ed6;
					box-shadow: 0 0 3px rgba(#b49ed6, 0.35);
				}

				&.invalid {
					border-color: red;
					box-shadow: 0 0 3px rgba(red, 0.35);
				}
			}

			&-desc {
				@include reset;

				color: #999999;
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

	.footer {
		margin-top: 30px;

		&__actions-row {
			display: flex;
			align-items: center;
			margin: 0 -1rem;
		}

		&__other-row {
			margin-top: 30px;

			@media (width < env(--tablet)) {
				text-align: center;
			}
		}

		&__info-col {
			padding: 0 1rem;
			min-width: 0;
			max-width: 100%;
			flex-grow: 1;

			@media (width < env(--tablet)) {
				display: none;
			}
		}

		&__button-col {
			padding: 0 1rem;
			min-width: 0;
			max-width: 100%;
			flex-shrink: 0;

			@media (width < env(--tablet)) {
				display: flex;
				justify-content: center;
				flex-grow: 1;
			}
		}
	}

	.info {
		display: flex;
		align-items: center;

		&__icon {
			margin-right: 24px;
			height: 27px;
			flex-shrink: 0;
			color: #cccccc;
		}

		&__body {
			@include reset;

			color: #999999;
			font-size: 12px;
			line-height: 1.25;
		}
	}

	.btn-default {
		@include reset;

		display: inline-flex;
		justify-content: center;
		align-items: center;
		padding: 0 40px;
		height: 56px;
		max-width: 100%;
		color: #ffffff;
		border-radius: 50px;
		background-color: #6039aa;
		cursor: pointer;
		transition: all 0.15s ease-in-out;

		&:not(:disabled) {
			&:hover {
				background-color: darken(#6039aa, 10%);
			}
		}

		&:disabled {
			opacity: 0.65;
		}

		&__icon {
			display: none;
			margin-right: 1rem;
			flex-shrink: 0;
			height: 21px;
			color: inherit;

			@media (width < env(--tablet)) {
				display: block;
			}
		}

		&__label {
			@include reset;

			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			text-align: center;
			color: inherit;
			font-size: 16px;
			line-height: 1.25;
			font-weight: 600;
			text-transform: uppercase;
			cursor: inherit;
		}
	}
</style>
