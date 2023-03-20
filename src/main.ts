import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import { loadFonts } from './plugins/webfontloader';
import '@mdi/font/css/materialdesignicons.css';
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import AOS from 'aos';
import 'aos/dist/aos.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// @ts-ignore
import { registerSW } from 'virtual:pwa-register';
registerSW({
    onNeedRefresh () {},
    onOfflineReady () {}
})()

const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App);
app.use(vuetify);
app.use(router)
app.use(VueAxios, axios);
app.use(loadFonts);
app.use(AOS.init());
app.use(VueSweetalert2);
app.mount('#app');
