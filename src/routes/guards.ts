import { NavigationGuardNext, RouteLocationNormalizedGeneric, RouteLocationNormalizedLoadedGeneric } from "vue-router"
import { useUserStore } from "../store/userLogged"

export function guardsTo(to: RouteLocationNormalizedGeneric, from: RouteLocationNormalizedLoadedGeneric, next: NavigationGuardNext): void {
  const userStore = useUserStore()
  const isAuth = userStore.userLogged?.usuario ?? false
  const requiredAuth = to.meta.requiresAuth
  if(requiredAuth && !isAuth){
   next("/login")
  }else {
    next()
  }
}