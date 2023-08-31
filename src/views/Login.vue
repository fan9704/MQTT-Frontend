<template>
  <v-container id="form-container">
    <Form></Form>
  </v-container>
</template>

<script>
import Form from "../components/login/Form.vue"

export default {
  name: "LoginView",
  components:{Form},
}
</script>

<style scoped>
#form-container{
  height: 100%;
}
</style>