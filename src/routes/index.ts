import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "../views/loginPage/index.vue";
import Users from "../views/usersPage/index.vue";
import NotFound from "../views/NotFound/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
    children: [
      {
        path: "/login",
        component: Login,
      },
    ],
    name: "login",
    meta: { requiresAuth: false}
  },
  {
    path: "/usuarios",
    component: Users,
    name: "users",
    meta: { requiresAuth: true },
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
