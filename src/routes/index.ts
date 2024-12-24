import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "../views/loginPage/index.vue";
import Users from "../views/usersPage/index.vue";
import Register from "../views/registerUser/index.vue";
import NotFound from "../views/NotFound/index.vue";
import { guardsTo } from "./guards";
import { Tipo } from "../model/Enums";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
    children: [
      {
        path: "/login",
        name:"login",
        component: Login,
      },
    ],
    name: "home",
    meta: { role: [Tipo.ADMIN, Tipo.COMUM],requiresAuth: false}
  },
  {
    path: "/usuarios",
    component: Users,
    name: "users",
    meta: { role: [Tipo.ADMIN, Tipo.COMUM],requiresAuth: true },
  },
  {
    path: "/register",
    component: Register,
    name: "register",
    meta: { role: [Tipo.ADMIN,],requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
];



export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  guardsTo(to, from, next);
});
