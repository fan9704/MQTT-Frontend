<template>
  <v-container class="container" id="container">
    <v-row class="flex-md-column">
      <v-col cols="6" md="6" sm="6" xs="6" class="form-container sign-up-container">
        <v-form class="form">
          <h1>Create Account</h1>
          <div class="social-container">
            <v-icon class="icon" v-on:click="gitHubSignIn">mdi-github</v-icon>
            <v-icon class="icon" v-on:click="googleSignIn">mdi-google</v-icon>
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Username" v-model="registerForm.username"/>
          <input type="email" placeholder="Email" v-model="registerForm.email"/>
          <input type="password" placeholder="Password" v-model="registerForm.password" />
          <v-btn v-on="register">Sign Up</v-btn>
        </v-form>
      </v-col>
      <v-col cols="6" md="6" sm="6" xs="6" class="form-container sign-in-container">
        <v-form class="form">
          <h1>Sign in</h1>
          <div class="social-container">
            <v-icon class="icon" v-on:click="gitHubSignIn">mdi-github</v-icon>
            <v-icon class="icon" v-on:click="googleSignIn">mdi-google</v-icon>
          </div>
          <span>or use your account</span>
          <input type="text" placeholder="Username" v-model="loginForm.username"/>
          <input type="password" placeholder="Password"  v-model="loginForm.password"/>
          <span >Forgot your password?</span>
          <v-btn v-on:click="login">Sign In</v-btn>
        </v-form>
      </v-col>
      <v-container class="overlay-container">
        <v-row class="overlay flex-md-column">
          <v-col cols="6" md="6" sm="6" xs="6" class="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <v-btn class="ghost" id="signIn"  v-on:click="signInSwitch()">Sign In</v-btn>
          </v-col>
          <v-col cols="6" md="6" sm="6" xs="6" class="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <v-btn class="ghost" id="signUp" v-on:click="signUpSwitch()">Sign Up</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
  </v-container>
</template>
<script>
import {signInWithPopup, GithubAuthProvider, GoogleAuthProvider} from "firebase/auth";
import {auth,githubProvider,googleProvider} from "../../utils/firebaseCore"
export default {
  name:"Form",
  data(){
    return{
      registerForm:{
        username:null,
        email: null,
        password: null,
      },
      loginForm:{
        username:null,
        password: null,
      }
    }
  },
  methods:{
    signInSwitch(){
      const container = document.getElementById('container');
      container.classList.remove("right-panel-active");
    },
    signUpSwitch(){
      const container = document.getElementById('container');
      container.classList.add("right-panel-active");
    },
    gitHubSignIn(){
      signInWithPopup(auth,githubProvider)
          .then((result)=>{
            this.username=result.user.displayName;
            this.loginStatus=true;
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GithubAuthProvider.credentialFromError(error);
          });
    },
    googleSignIn(){
      signInWithPopup(auth,googleProvider)
          .then((result)=>{
            this.username=result.user.displayName;
            this.loginStatus=true;
            this.email=result.user.email;
            this.password = result.user.uid;
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
          });
    },
    login(){
      this.axios.post("/api/account/login/",this.loginForm)
          .then(({data})=>console.log(data))
          .catch((err)=>console.log(err));
    },
    register(){
      this.axios.post("/api/account/register/",this.registerForm)
          .then(({data})=>console.log(data))
          .catch((err)=>console.log(err));
    },

  }
}
</script>
<style scoped>
@import "Form.css";
</style>