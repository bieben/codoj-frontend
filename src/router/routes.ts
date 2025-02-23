import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AdminView from "@/views/AdminView.vue";
import NoAuthView from "@/views/NoAuthView.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import ProblemsView from "@/views/problem/ProblemsView.vue";
import ProblemSubmitView from "@/views/problem/ProblemSubmitView.vue";
import ViewProblemView from "@/views/problem/ViewProblemView.vue";
import AddProblemView from "@/views/problem/AddProblemView.vue";
import ManageProblemView from "@/views/problem/ManageProblemView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "User",
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "User Login",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "User Register",
        component: UserRegisterView,
      },
    ],
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/",
    name: "Home",
    component: ProblemsView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/problems",
    name: "Problems",
    component: ProblemsView,
  },
  {
    path: "/problems_submit",
    name: "Submission",
    component: ProblemSubmitView,
  },
  {
    path: "/view/problem/:id",
    name: "Coding",
    component: ViewProblemView,
    props: true,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/add/problem",
    name: "Add Problem",
    component: AddProblemView,
    meta: {
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/update/problem",
    name: "Update Problem",
    component: AddProblemView,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/manage/problem",
    name: "Manage Problems",
    component: ManageProblemView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/noAuth",
    name: "No Authentication",
    component: NoAuthView,
    meta: {
      hideInMenu: true,
    },
  },
  // {
  //   path: "/admin",
  //   name: "Admin",
  //   component: AdminView,
  //   meta: {
  //     access: ACCESS_ENUM.ADMIN,
  //   },
  // },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];
