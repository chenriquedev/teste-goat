<template>
  <v-card class="mx-auto" max-width="900">
    <v-card-title class="pa-5">Registrar Usuário</v-card-title>
    <v-card-text>
      <v-sheet class="mx-auto registerSheet" max-width="800" width="700">
        <v-form ref="registerForm" fast-fail validate-on="submit lazy" class="form d-flex flex-column">
          <div class="d-inline d-md-flex ga-4">
            <v-text-field type="text" v-model="newUser.nome" :rules="[registerRules.nomeRequired]"
              label="Nome"></v-text-field>
            <v-text-field type="text" v-model="newUser.matricula"
              :rules="[registerRules.matriculaRequired, registerRules.matriculaUnique]"
              label="Matricula"></v-text-field>
            <v-text-field type="text" v-model="newUser.idade" :rules="[registerRules.idadeRange]"
              label="Idade"></v-text-field>
          </div>
          <div class="d-inline d-md-flex ga-4">
            <v-select :items="cargos" v-model="newUser.cargo" :rules="[registerRules.cargoRequired]"
              label="Cargo"></v-select>
            <v-select label="Tipo de usuário" v-model="newUser.tipo" :rules="[registerRules.tipoRequired]"
              :items="tipos"></v-select>
          </div>
        </v-form>
      </v-sheet>
      <v-card-actions class="pr-5 mb-5 mt-5">
        <v-btn class="ms-auto bg-green-darken-2 font-weight-bold px-4" text="Salvar" @click="saveUser"></v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Service } from '../../api/Service';
import { IUsuario } from '../../model/IUser';
import { usuarioFactory } from '../../utils/usuarioFactory';
import { cargos, tipos } from '../../utils/lists';
import { ref, Ref } from 'vue';

const router = useRouter()
const registerForm = ref()
const newUser: Ref<IUsuario> = ref({} as IUsuario)
const registerRules = {
  nomeRequired: (value: string) => !!value || 'Field is required',
  matriculaRequired: (value: string) => !!value || 'Field is required',
  matriculaUnique: () => matriculaAlreadyExists() || "Registration already registered",
  idadeRange: (value: number) => (value >= 18 || value <= 60) || 'Invalid age',
  cargoRequired: (value: string) => !!value || 'Field is required',
  tipoRequired: (value: string) => !!value || 'Field is required'
}

async function saveUser(): Promise<void> {
  const validate = await validateForm()
  if (!validate) {
    return
  }
  const newUsuario = usuarioFactory(newUser.value);
  await Service.createUsuario(newUsuario);
  router.go(-1)
}

async function matriculaAlreadyExists(): Promise<boolean> {
  const exists = await Service.findUsuarioBy(newUser.value.matricula)
  if (exists?.data[0]?.matricula) {
    return false
  }
  return true
}

async function validateForm(): Promise<boolean> {
  const validate = await registerForm.value.validate()
  return validate?.valid
}
</script>