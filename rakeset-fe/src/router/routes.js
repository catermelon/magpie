const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        name: "Home",
        path: "",
        component: () => import("pages/Home.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("layouts/EmptyLayout.vue"),
    children: [
      {
        name: "Login",
        path: "",
        component: () => import("src/pages/login/Login.vue"),
        meta: { bypassAuth: true },
      },
      {
        name: "Verify",
        path: "verify",
        component: () => import("src/pages/login/OAuthCallback.vue"),
        props: (route) => route.query,
        meta: { bypassAuth: true },
      },
    ],
  },

  {
    path: "/urls",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        name: "Urls",
        path: "",
        component: () => import("src/pages/tinyURL/List.vue"),
        meta: { pageTitle: "Short URLs" },
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
