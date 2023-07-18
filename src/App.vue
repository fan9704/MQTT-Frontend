<template>
  <v-card class="mx-auto" color="grey-lighten-3">
    <v-layout>
      <v-app-bar
          color="teal-darken-4"
          image="https://picsum.photos/1920/1080?random"
      >
        <template v-slot:image>
          <v-img
              gradient="to top right, rgba(253,147,64,.8), rgba(254,172,110,.8)"
          ></v-img>
        </template>

        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-app-bar-title>Pet Monitoring Frontend</v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer
          v-model="drawer"
          location="left"
          temporary
      >

        <v-list>
          <v-list-item to="/" prepend-icon="mdi-home" title="Home Page"></v-list-item>
          <v-list-item to="/login" prepend-icon="mdi-account" title="Login/Register"></v-list-item>
          <v-list-item to="/pet/dog" prepend-icon="mdi-dog" title="Pet Information"></v-list-item>
          <v-list-item to="/machine/management" prepend-icon="mdi-home-automation" title="Machine Management"></v-list-item>
          <v-list-item to="/graph" prepend-icon="mdi-graph" title="Graph"></v-list-item>
          <v-list-item @click="console.log('Download App')" prepend-icon="mdi-download-box" title="Download App" id="download"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import {onMounted, provide, reactive, ref} from "vue";
import { getToken,onMessage } from "firebase/messaging";

export default {
  name: 'App',

  components: {
    HelloWorld,
  },
  setup(){
    const notification = ref(null);
    const states = reactive({
      deferredPrompt: null,
    });
    onMounted(() => {
      window.addEventListener("beforeinstallprompt", e => {
        e.preventDefault();
        states.deferredPrompt = e;
      });
      window.addEventListener("appinstalled", () => {
        states.deferredPrompt = null;
      });
      document.querySelector("#download").addEventListener("click", () => {
        if (states.deferredPrompt) {
          states.deferredPrompt.prompt();
          states.deferredPrompt = null;
        }
      });
    });
  },
  data: () => ({
    drawer:false,
    group: null,
    items: [
      {
        title: 'Foo',
        value: 'foo',
      },
      {
        title: 'Bar',
        value: 'bar',
      },
      {
        title: 'Fizz',
        value: 'fizz',
      },
      {
        title: 'Buzz',
        value: 'buzz',
      },
    ],
  }),
  watch: {
    group () {
      this.drawer = false
    },
  },
  mounted () {
    console.log('Firebase cloud messaging object', this.$messaging)
    getToken(this.$messaging,{
      vapidKey: "BIGbuGz1MOztzbd3qpesAdtm1DKfhNVatZAdTU_ncPLrQWISpzFbbTjQS5dkQkqkLah43ic5MhJHWK3K_Ix-h0I"
    })
        .then((token) => {
          console.log('FCM Token:', token);
        })
        .catch((error) => {
          console.error('FCM 訂閱失敗:', error);
        });
    onMessage(this.$messaging, (payload) => {
      console.log("收到通知:", payload);
      notification.value = payload;
    });
  }
}
</script>
