import { getAuth, GithubAuthProvider,GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyA1FevAEUfg7u_tmhjPKGLJfVFBiQaghCY",
    authDomain: "petmonitoringsystem-729da.firebaseapp.com",
    projectId: "petmonitoringsystem-729da",
    storageBucket: "petmonitoringsystem-729da.appspot.com",
    messagingSenderId: "218937674834",
    appId: "1:218937674834:web:2961695e7663494adb638b",
    measurementId: "G-D4TRM99C0G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const githubProvider = new GithubAuthProvider();
const  googleProvider = new GoogleAuthProvider();

export { auth, githubProvider,googleProvider }