import { RouterMount, createRouter } from "uni-simple-router";
import { getToken } from "@/utils/auth";
import store from "@/store";

const router = createRouter({
    platform: process.env.VUE_APP_PLATFORM,
  APP: {
    launchedHook: () => {
      // #ifdef APP-PLUS
      plus.navigator.closeSplashscreen();
      // #endif
    },
  },
  routes: [
    ...ROUTES,
    {
      path: "*",
      redirect() {
        return { name: "404" };
      },
    },
  ],
});

export const whiteListRoutes = [];

// async function checkWebConfig() {
//   if (store.getters.webConfig.publicKey) {
//     return true;
//   }
//   await store.dispatch("app/setWebConfig");
//   return !!this.$store.getters.webConfig.publicKey;
// }

router.beforeEach((to, from, next) => {
//   const hasToken = getToken();
//   const isWhite = whiteListRoutes.indexOf(to.name) !== -1;
//   const isLogin = store.getters.user.id;

  // #ifdef APP-PLUS
  // if (to.name === from.name && to.name === 'home') {
  //   // 首次启动
  //   next();
  //   return;
  // }
  // #endif

  //   if (hasToken) {
  //     if (!isLogin) {
  //       return checkWebConfig()
  //         .then(() => {
  //           return store.dispatch("user/getUser");
  //         })
  //         .then((_) => {
  //           next();
  //         })
  //         .catch((e) => {
  //           if (isWhite) {
  //             next();
  //           } else {
  //             next({ name: "login", NAVTYPE: "replaceAll" });
  //           }
  //         });
  //     } else {
  //       next();
  //     }
  //   } else {
  //     if (isWhite) {
  //       next();
  //     } else {
  //       return checkWebConfig()
  //         .then(() => {
  //           return store.dispatch("user/getUser");
  //         })
  //         .then((_) => {
  //           next();
  //         })
  //         .catch((e) => {
  //           next({ name: "login", NAVTYPE: "replaceAll" });
  //         });
  //     }
  //   }
});
// 全局路由后置守卫
router.afterEach((to, from) => {});

export { router, RouterMount };
