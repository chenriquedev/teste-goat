<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from './store/userLogged';
import { Tipo } from './model/Enums';

const userStore = useUserStore()
const router = useRouter()
function logout(): void {
  userStore.$reset()
  router.push({ name: "login" })
}

function register(): void {
  router.push({ name: "register" })
}

function back(): void {
  router.go(-1)
}
</script>

<template>
  <v-app>
    <v-app-bar v-if="userStore.userLogged?.usuario">
      <v-app-bar-title>
        {{ userStore.userLogged?.usuario }}
      </v-app-bar-title>
      <template v-slot:append>
        <v-btn class="mr-3 "
          v-if="userStore.userLogged?.tipo === Tipo.ADMIN && router.currentRoute.value.path !== '/register'"
          @click="register">
          <v-icon size="large" class="mr-3" icon="mdi-account-plus-outline" start></v-icon>
          <span class="d-none d-md-inline">Adicionar Usuario</span>
        </v-btn>
        <v-btn class="mr-3"
          v-if="userStore.userLogged?.tipo === Tipo.ADMIN && router.currentRoute.value.path === '/register'"
          @click="back">
          <v-icon size="large" class="mr-3" icon="mdi-keyboard-backspace" start></v-icon>
          <span>Voltar</span>
        </v-btn>
        <v-btn @click="logout" icon="mdi-logout" size="large"></v-btn>
      </template>
    </v-app-bar>
    <v-main class=" bg-grey-lighten-3">
      <v-container>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>
