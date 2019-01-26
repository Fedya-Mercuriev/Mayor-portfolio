import Vue from 'vue';
import App from './components/App.vue';
import './scss/general.scss';

let app = new Vue({
    el: "#app",
    render: h => h(App)
});