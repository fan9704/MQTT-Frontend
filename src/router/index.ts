import {createRouter, createWebHistory} from "vue-router";
import StompChat from "../components/stompChat.vue";
import IndexView from "../views/Index.vue";
import HelloWorld from "../components/HelloWorld.vue";
import LoginView from "../views/Login.vue";

const routes = [
    {
        path: "/",
        name: "IndexView",
        component: IndexView,
    },
    {
        path: "/login",
        name: "LoginView",
        component: LoginView,
    },
    {
        path: "/test",
        name: "index",
        component: HelloWorld,
    },
    {
        path: "/graph",
        name: "stompChat",
        component:StompChat,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;