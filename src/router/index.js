import {createRouter, createWebHistory} from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import Chat from "../components/chat.vue"

const routes = [{
    path: "/",
    name: "index",
    component: HelloWorld,
},
    {
        path:"/chat",
        name:"chat",
        component: Chat,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;