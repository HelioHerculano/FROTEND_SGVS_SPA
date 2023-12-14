import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import bankView from "../views/BankView.vue";
import ExamTimeTableView from "../views/ExamTimeTableView.vue";
import LocationExameView from "../views/LocationExameView.vue";
import ExamRoomView from "../views/ExamRoomView.vue";
import EmployeeTypeView from "../views/EmployeeTypeView.vue";
import EmployeeView from "../views/EmployeeView.vue";

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
      path: "/horarios",
      name: "ExamTimeTableView",
      component: ExamTimeTableView,
    },
    {
      path: "/cargos",
      name: "EmployeeTypeView",
      component: EmployeeTypeView,
    },
    {
      path: "/LocaisExames",
      name: "LocationExameView",
      component: LocationExameView,
    },
    {
      path: "/salas",
      name: "ExamRoomView",
      component: ExamRoomView,
    },
    {
      path: "/pessoal",
      name: "EmployeeView",
      component: EmployeeView,
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
