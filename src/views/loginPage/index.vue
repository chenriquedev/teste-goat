<template>
  <section class="d-flex justify-center align-center h-screen">
    <v-card class="d-flex flex-column justify-center align-center pa-10">
      <v-card-title class="text-h4 font-weight-bold">Login</v-card-title>
      <v-card-text>
        <v-sheet class="mx-auto" width="300">
          <v-form ref="loginForm" fast-fail validate-on="submit lazy" @submit.prevent="submit">
            <v-text-field v-model="login.usuario" label="User" :rules="[loginRules.userRequired]"></v-text-field>

            <v-text-field v-model="login.senha" type="password" label="Password"
              :rules="[loginRules.passwordRequired]"></v-text-field>

            <v-btn class="mt-2" type="submit" block :loading="loading" color="success" variant="elevated">Submit</v-btn>
          </v-form>
        </v-sheet>
      </v-card-text>
    </v-card>
  </section>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { ILogin, IUserLogged, IUserResponse } from '../../model/IUser';
import { Service } from '../../api/Service';
import { useUserStore } from '../../store/userLogged';
import { useRouter } from 'vue-router';

const userStore = useUserStore()
const router = useRouter()
const loginForm = ref()
const login = ref({} as ILogin)
const loading = ref(false)
const loginRules = {
  userRequired: (value: string) => !!value || 'Field is required',
  passwordRequired: (value: string) => !!value || 'Field is required'
}

async function submit(): Promise<void> {
  toggleButtonLoading()
  const validate = await validateForm()
  if (!validate) {
    toggleButtonLoading()
    return
  }
  const userData = await userLogin()
  if (userData) {
    setUserStore({ usuario: userData?.usuario, tipo: userData?.tipo })
    router.push({ name: "users" })
  }
  toggleButtonLoading()
}

async function userLogin(): Promise<IUserResponse | null> {
  const { data } = await Service.usuarioLogin(login?.value)
  return data ? data[0] : null
}

function setUserStore(data: IUserLogged): void {
  userStore.setUser({ usuario: data?.usuario, tipo: data?.tipo })
}

async function validateForm(): Promise<boolean> {
  const validate = await loginForm.value?.validate()
  return validate?.valid
}

function toggleButtonLoading(): void {
  loading.value = !loading.value
}


</script>