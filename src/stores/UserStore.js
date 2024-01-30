import { defineStore } from "pinia";
export const UserStore = defineStore({
  id:'UserStoreId',
  state:() => ({
    token: localStorage.getItem('token') || 0,
    user: localStorage.getItem('user') || null
  }),
  
  getters:{
    // getToKen: function () {
    //     return this.token
    // }
    getToken: state => state.token,
    getUser: user => state.user
  },

  actions:{
    setToken: function(token){
        this.token  = token
        localStorage.setItem('token',token)
    },
    removeToken: function(){
      this.token = 0;
      localStorage.removeItem("token");
    },

    setUser: function(user){
        this.user  = user
        localStorage.setItem('user',user)
    },
    removeUser: function(){
      this.user = null;
      localStorage.removeItem("user");
    }
  }
})