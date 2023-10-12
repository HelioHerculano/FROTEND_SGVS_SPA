import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import bankView from "../views/BankView.vue";
import LocationExameView from "../views/LocationExameView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/bancos",
      name: "bank",
      component: bankView,
    },
    {
      path: "/LocaisExames",
      name: "LocationExameView",
      component: LocationExameView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
