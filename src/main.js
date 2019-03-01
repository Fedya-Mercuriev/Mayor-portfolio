import Vue from 'vue';
import App from './components/App.vue';
import './scss/general.scss';
import { i18n } from './plugins/i18n.js';

Vue.config.productionTip = false;

let app = new Vue({
    // el: ,
    i18n,
    render: h => h(App)
}).$mount('#app');