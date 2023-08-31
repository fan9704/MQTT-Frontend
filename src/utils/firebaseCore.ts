import { getAuth, GithubAuthProvider,GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
import { getDatabase} from "firebase/database";

// const firebaseConfig = {
//     apiKey: "AIzaSyA1FevAEUfg7u_tmhjPKGLJfVFBiQaghCY",
//     authDomain: "petmonitoringsystem-729da.firebaseapp.com",
//     projectId: "petmonitoringsystem-729da",
//     storageBucket: "petmonitoringsystem-729da.appspot.com",
//     messagingSenderId: "218937674834",
//     appId: "1:218937674834:web:2961695e7663494adb638b",
//     measurementId: "G-D4TRM99C0G"
// };
const firebaseConfig = {
    apiKey: "AIzaSyAVEkDc77EJPSD6Eq3tU5sLKVyfIGQKv_M",
    authDomain: "smart-translate-374404.firebaseapp.com",
    projectId: "smart-translate-374404",
    storageBucket: "smart-translate-374404.appspot.com",
    messagingSenderId: "542902799979",
    appId: "1:542902799979:web:fc0431973b79b08b046b2e",
    measurementId: "G-MK0ZS58D38"
};
// "https://smart-translate-374404-default-rtdb.firebaseio.com"
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp);
const messaging = getMessaging(firebaseApp)

const githubProvider = new GithubAuthProvider();
const  googleProvider = new GoogleAuthProvider();
const db = getDatabase(firebaseApp)
export default firebaseApp;
export { auth,messaging, githubProvider,googleProvider,db,firebaseApp }