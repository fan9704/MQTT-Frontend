<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
            :src="'/PetMonitoringSystem-Frontend/imgs/applogo.png'"
            class="my-3"
            contain
            height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          歡迎來到寵物監測系統應用程式
        </h1>

        <h4>功能導覽</h4>

        <p class="subheading font-weight-regular">
          需要更多協助可以尋求
          <br>請加入我們的線上
          <a
              href="https://community.vuetifyjs.com"
              target="_blank"
          >社群</a>
        </p>
      </v-col>

      <v-col
          class="mb-5"
          cols="12"
      >
        <h2 class="headline font-weight-bold mb-5">
          快速使用
        </h2>

        <v-row justify="center">
          <v-btn
              rounded="pill"
              color="#FD9340"
          >
            註冊
          </v-btn>
          <v-btn
              rounded="pill"
              color="#FD9340"
          >
            登入
          </v-btn>
        </v-row>
      </v-col>

      <v-col
          class="mb-5"
          cols="12"
      >
        <h2 class="headline font-weight-bold mb-5">
         相關連結
        </h2>
        <v-row justify="center">
          <a
              v-for="(link, i) in importantLinks"
              :key="i"
              :href="link.href"
              class="subheading mx-3"
              target="_blank"
          >
            {{ link.text }}
          </a>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
  <PetTypeList></PetTypeList>>
</template>

<script>
// import logo from '/PetMonitoringSystem-Frontend/imgs/applogo.png'
import PetTypeList from "../components/homeComponents/PetTypeList.vue";

export default {
  name: 'IndexView',
  components: {PetTypeList},
  data: () => ({
    ecosystem: [
      {
        text: 'vuetify-loader',
        href: 'https://github.com/vuetifyjs/vuetify-loader/tree/next',
      },
      {
        text: 'github',
        href: 'https://github.com/vuetifyjs/vuetify/tree/next',
      },
      {
        text: 'awesome-vuetify',
        href: 'https://github.com/vuetifyjs/awesome-vuetify',
      },
    ],
    importantLinks: [
      {
        text: 'Frontend GitHub',
        href: 'https://github.com/fan9704/MQTT-Frontend',
      },
      {
        text: 'Backend GitHub',
        href: 'https://github.com/fan9704/PetMonitoringSystem-Backend',
      },
      {
        text: 'Application GitHub',
        href: 'https://github.com/fan9704/PetMonitoringSystem-Application',
      },
      {
        text: 'Hardware GitHub',
        href: 'https://github.com/fan9704/PetMonitoringSystem-Hardware',
      },
    ],
    logo,
    whatsNext: [
      {
        text: '註冊',
        href: 'https://vuetifyjs.com',
      },
      {
        text: '登入',
        href: 'https://vuetifyjs.com/introduction/roadmap/',
      },
    ],
  }),
}
</script>
<style>
.v-btn{
  color:white;
  margin: 5px;
}
</style>