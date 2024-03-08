import { defineStore } from 'pinia'
import { vmType } from '../utils/ifaces/vmTypes.enum';

export const useLoginStore = defineStore('login', {
  state: () => {
    if (localStorage.getItem("user") && localStorage.getItem("loggedIn") && localStorage.getItem("authVms")) {
      console.log("Local storage user : ", JSON.parse(localStorage.getItem("user") as string));
      console.log("Local storage loggedIn : ", JSON.parse(localStorage.getItem("loggedIn") as string));
      console.log("Local storage authVms : ", JSON.parse(localStorage.getItem("authVms") as string));
      return {
        user: JSON.parse(localStorage.getItem("user") as string) ?? "",
        loggedIn: JSON.parse(localStorage.getItem("loggedIn") as string) ?? "",
        authVms: JSON.parse(localStorage.getItem("authVms") as string) ?? [""],
      };
    }
    return {
      user: "",
      loggedIn: false,
      authVms: [""],
    };
  },
  actions: {
    login(user: string, authVms: string[]) {
      this.user = user
      this.loggedIn = true
      this.authVms = authVms
    },
    logout() {
      this.user = ""
      this.loggedIn = false
      this.authVms = [""]
    },
  },
})