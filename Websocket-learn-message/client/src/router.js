import Vue from "vue";
import Router from "vue-router";
import Index from "./views/index";
// import Login from "./views/login"
// import Register from "./views/register"
import Information from "./views/Information";
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      component: Index,
      redirect: "/chats",
      children: [
        {
          path: "/chats",
          name: "chats",
          component: () => import("./views/Chats.vue")
        },
        {
          path: "/contacts",
          name: "contacts",
          component: () => import("./views/Contacts.vue")
        },
        {
          path: "/discover",
          name: "discover",
          component: () => import("./views/Discover.vue")
        },
        {
          path: "/me",
          name: "me",
          component: () => import("./views/Me.vue")
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/login.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () => import("./views/register.vue")
    },
    {
      path: "/information",
      name: "information",
      component: () => import("./views/Information.vue")
    },
    {
      path: "/chat",
      name: "chat",
      component: () => import("./views/ChatView.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.wxpyqToken ? true : false;
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
});

export default router;
