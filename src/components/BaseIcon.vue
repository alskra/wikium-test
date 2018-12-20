<template lang="pug">
	svg.icon(
		xmlns="http://www.w3.org/2000/svg"
		:class="`icon--${name}`"
		:width="width"
		:height="height"
		:viewBox="icons[name].viewBox"
		v-html="icons[name].content"
		:aria-labelledby="`${name} icon`"
		role="presentation"
		:fill="color"
	)
</template>

<script>
	export default {
		name: 'BaseIcon',
		props: {
			name: {
				type: String,
				default: 'base',
			},
			width: {
				type: [Number, String],
				default: '1.5rem',
			},
			height: {
				type: [Number, String],
				default: '1.5rem',
			},
			color: {
				type: String,
				default: 'currentColor',
			},
		},
		data() {
			return {
				icons: {
					base: {
						viewBox: '0 0 24 24',
						content: '',
					},
				},
			};
		},
	}
</script>

<style lang="scss">
	.icon {
		* {
			pointer-events: none;
		}
	}
</style>
