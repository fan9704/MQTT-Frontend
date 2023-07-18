import {createRouter, createWebHistory} from "vue-router";
import StompChat from "../components/stompChat.vue";
import IndexView from "../views/Index.vue";
import HelloWorld from "../components/HelloWorld.vue";
import LoginView from "../views/Login.vue";
import PetListView from "../views/PetList.vue";
import MachineManagement from "../views/MachineManagement.vue";
import ChatLayout from "../components/chatComponents/chatLayout.vue";

const routes = [
    {
        path: "/",
        name: "IndexView",
        component: IndexView,
    },
    {
        path: "/pet/:petType",
        name: "PetListView",
        component: PetListView,
        props: true,
    },
    {
        path: "/machine/management",
        name: "MachineManagementView",
        component: MachineManagement,
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
        component: StompChat,
    },
    {
        path:"/chat",
        name:"chatLayout",
        component:ChatLayout
    }
];

const router = createRouter({
    history: createWebHistory('/PetMonitoringSystem-Frontend/'),
    routes,
});

export default router;