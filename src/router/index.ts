import { createRouter, createWebHistory } from "vue-router";
import { authUser, authIsLoading } from "@/lib/auth";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/pages/Home.vue"),
  },
  {
    path: "/auth/login",
    name: "Login",
    component: () => import("@/pages/auth/Login.vue"),
  },
  {
    path: "/auth/signup",
    name: "Signup",
    component: () => import("@/pages/auth/Signup.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/pages/Dashboard.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/tickets",
    name: "Tickets",
    component: () => import("@/pages/Tickets.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/tickets/create",
    name: "CreateTicket",
    component: () => import("@/pages/CreateTicket.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/tickets/:id/edit",
    name: "EditTicket",
    component: () => import("@/pages/EditTicket.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !authIsLoading.value && !authUser.value) {
    next("/auth/login");
  } else {
    next();
  }
});

export default router;
