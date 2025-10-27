import { createRouter, createWebHistory } from "vue-router";
import { watch } from "vue";
import { authUser, authIsLoading, initAuth } from "@/lib/auth";

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

// --- Initialize auth before first route ---
// initAuth();
// router.beforeEach((to, from, next) => {
//   // Wait until auth check finishes
//   if (authIsLoading.value) {
//     const unwatch = watch(authIsLoading, (val) => {
//       if (!val) {
//         unwatch();
//         handleRouteGuard(to, next);
//       }
//     });
//   } else {
//     handleRouteGuard(to, next);
//   }
// });

// function handleRouteGuard(to: any, next: any) {
//   if (to.meta.requiresAuth && !authUser.value) {
//     next("/auth/login");
//   } else {
//     next();
//   }
// }

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/login", "signup", "/"];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !authUser) {
    // auth.returnUrl = to.fullPath;
    return "/auth/login";
  }
});
export default router;
