import { defineStore } from "pinia";
export const AppState = defineStore({
  id: "AppStateId",
  state: () => ({
    isLogin: localStorage.getItem("isLogin") || true,
  }),

  getters: {
    // getisLogin: function () {
    //     return this.isLogin
    // }
    getisLogin: (state) => state.isLogin,
  },

  actions: {
    setisLogin: function (isLogin) {
      this.isLogin = isLogin;
      localStorage.setItem("isLogin", isLogin);
    },
    removeisLogin: function () {
      this.isLogin = 0;
      this.removeItem("isLogin");
    },
  },
});