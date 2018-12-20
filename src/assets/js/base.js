// Styles
import '../scss/variables.scss';
import '../scss/setup.scss';
import 'normalize.css';
import '../scss/fonts.scss';
import '../scss/bootstrap.scss';
import '../scss/page.scss';
import '../scss/content.scss';

// Polyfills
import cssVars from 'css-vars-ponyfill';
import 'focus-visible';
import focusWithin from 'focus-within';

import Vue from 'vue';

cssVars();

focusWithin(document, {
	attr: false,
	className: 'focus-within',
	force: true,
});

Vue.config.productionTip = false;

// Import base components
const requireComponent = require.context('../../components', true, /Base[A-Z]\w+\.(vue|js)$/);

requireComponent.keys().forEach(fileName => {
	const componentConfig = requireComponent(fileName).default || requireComponent(fileName);

	const componentName = componentConfig.name || (
		fileName
			.replace(/^.+\//, '')
			.replace(/\.\w+$/, '')
	);

	Vue.component(componentName, componentConfig);
});
