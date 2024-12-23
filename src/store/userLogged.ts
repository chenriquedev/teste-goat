import { defineStore } from "pinia";
import { ref } from "vue";
import { IUserLogged } from "../model/IUser";



export const useUserStore = defineStore("userStore", () => {
  let userLogged = ref({} as IUserLogged | null);

  function $reset() {
    userLogged.value = null;
  }

  function setUser(user: IUserLogged) {
    userLogged.value = user;
  }

  return { userLogged, $reset, setUser };
});
