import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify.js'
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import { loadFonts } from './plugins/webfontloader'

loadFonts();
const app = createApp(App);
app.use(vuetify);
app.use(router)
app.use(VueAxios, axios);
app.use(loadFonts);
app.mount('#app');
