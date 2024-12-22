import { defineStore } from "pinia";
import { ref } from "vue";
import { Tipo } from "../model/EnumTipo";

interface UserLogged {
  usuario: string;
  role: Tipo;
}

export const useUserStore = defineStore("userStore", () => {
  let userLogged = ref({} as UserLogged | null);

  function $reset() {
    userLogged.value = null;
  }

  function setUser(user: UserLogged) {
    userLogged.value = user;
  }

  return { userLogged, $reset, setUser };
});
