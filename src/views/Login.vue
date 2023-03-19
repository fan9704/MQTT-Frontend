<template>
  <v-container>
    <h2 id="title">建立新帳戶</h2>
    <h4 id="subtitle">Water is life.Water is a basic human need.In various lines of life,humans need water</h4>
    <v-sheet class="pa-12" rounded>
      <transition name="slide">
      <v-card class="mx-auto px-6 py-8" max-width="344" v-show="!isShow">
        <v-form
            v-model="form"
            @submit.prevent="onSubmit"
        >
          <v-text-field
              v-model="username"
              :readonly="loading"
              :rules="[required]"
              class="mb-2"
              clearable
              label="Username"
          ></v-text-field>

          <v-text-field
              v-model="password"
              :readonly="loading"
              :rules="[required]"
              clearable
              label="Password"
              placeholder="Enter your password"
          ></v-text-field>

          <br>
          還沒有帳號
          <span class="mr-4 switch-btn" v-on:click="isShow = !isShow;">
               註冊
          </span>
          <v-btn
              class="account-btn"
              :disabled="!form"
              :loading="loading"
              block
              color="#FD9340"
              size="large"
              type="submit"
              variant="elevated"
          >
            登入
          </v-btn>
        </v-form>
      </v-card>
      </transition>
      <transition name="slide" >
        <v-card class="mx-auto px-6 py-8" max-width="344" v-show="isShow">
          <v-form
              v-model="form"
              @submit.prevent="onSubmit"
          >
            <v-text-field
                v-model="username"
                :readonly="loading"
                :rules="[required]"
                class="mb-2"
                clearable
                label="Username"
            ></v-text-field>
            <v-text-field
                v-model="email"
                :readonly="loading"
                :rules="[required]"
                class="mb-2"
                clearable
                label="Email"
            ></v-text-field>
            <v-text-field
                v-model="password"
                :readonly="loading"
                :rules="[required]"
                clearable
                label="Password"
                placeholder="Enter your password"
            ></v-text-field>
            已經有帳號了
            <span  class="mr-4 switch-btn" v-on:click="isShow = !isShow;">
               登入
            </span>
            <br>

            <v-btn
                class="account-btn"
                :disabled="!form"
                :loading="loading"
                block
                color="#FD9340"
                size="large"
                type="submit"
                variant="elevated"
            >
              註冊
            </v-btn>
            <br>
            <v-btn
                block
                class="oauth-btn"
                color="blue"
                size="large"
                variant="elevated"
                prepend-icon="mdi-google"
                @click="googleLogin"
            >
              Google登入
            </v-btn>
            <v-btn
                block
                class="oauth-btn"
                color="black"
                size="large"
                variant="elevated"
                prepend-icon="mdi-github"
                @click="gitHubLogin"
            >
              GitHub登入
            </v-btn>
          </v-form>
        </v-card>
      </transition>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  name: "LoginView",
  data: () => ({
    form: false,
    username:null,
    email: null,
    password: null,
    loading: false,
    isShow:true,
  }),
  methods: {
    onSubmit () {
      if (!this.form) return

      this.loading = true

      setTimeout(() => (this.loading = false), 2000)
    },
    required (v) {
      return !!v || 'Field is required'
    },
    googleLogin(){

    },
    gitHubLogin(){

    }

  },
}
</script>

<style scoped>
#title{
  color: black;
}
#subtitle{
  color: gray;
}
span.switch-btn{
  color: #FD9340;
  font-weight: bolder;
}
.account-btn{
  color: white;
}
.v-text-field{
  color: #FD9340;
}
.slide-leave-active,
.slide-enter-active {
  transition: all 0.7s ease;
  /*transform: opacity;*/
}
.slide-enter-from {
  transform: translateY(100%);
  opacity: 0;
}
.slide-enter-to {
  /* transform: translateY(-50%); */
  opacity: 1;
}
.slide-leave-from {
  /* transform: translateY(-50%); */
  opacity: 1;
}
.slide-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>