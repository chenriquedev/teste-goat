<template>

  <v-text-field v-model="search" @update:modelValue="changeSearch" append-inner-icon="mdi-magnify" density="comfortable" label="Search" variant="solo" hide-details
   class="mb-10"></v-text-field>

  <v-table>
    <thead>
      <tr>
        <th class="text-center font-weight-bold">
          Nome
        </th>
        <th class="text-center font-weight-bold">
          Matrícula
        </th>
        <th class="text-center font-weight-bold">
          Cargo
        </th>
        <th class="text-cente font-weight-bold">
          Idade
        </th>
        <th class="text-center font-weight-bold">
          Tipo de Usuário
        </th>
        <th v-if="isAdmin()" class="text-center font-weight-bold">
          Options
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in users" :key="item.id">
        <td class="text-center">{{ item?.nome }}</td>
        <td class="text-center">{{ item?.matricula }}</td>
        <td class="text-center">{{ item?.cargo }}</td>
        <td class="text-center">{{ item?.idade }}</td>
        <td class="text-center">{{ userRole(item?.tipo) }}</td>
        <td v-if="isAdmin()" class="text-center">
          <div class="d-flex justify-center ga-4">
            <v-btn @click="selectUser(item, 'edit')" icon="mdi-file-edit-outline" size="small" elevation="1"
              color="green-darken-2"></v-btn>
            <v-btn @click="selectUser(item, 'delete')" icon="mdi-delete-outline" size="small" elevation="1"
              color="red-darken-2"></v-btn>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>
  <div class="text-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination rounded="circle" @update:model-value="changePage" v-model="actualPage" :length="totalPages"
              class="my-4"></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <v-dialog v-model="deletDialog" width="auto" persistent>
    <v-card max-width="400" prepend-icon="mdi-delete-outline" text="Você realmente deseja deletar este usuário?"
      title="Deletar usuário">
      <v-card-actions>
        <v-btn class="ms-auto font-weight-bold" text="Cancelar" @click="deletDialog = false"></v-btn>
        <v-btn class="ms-auto bg-red-darken-2 font-weight-bold" text="Deletar" @click="deleteUser()"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="editDialog" width="auto" persistent>
    <v-card max-width="500" prepend-icon="mdi-file-edit-outline" title="Editar usuário">
      <v-sheet class="mx-auto px-6" max-width="800" width="500">
        <v-form ref="editForm" fast-fail validate-on="submit lazy" class="form">
          <v-text-field v-model="selectedUser.nome" type="text" label="Nome"></v-text-field>
          <v-text-field v-model="selectedUser.matricula" type="text" label="Matricula"></v-text-field>
          <v-select :items="cargos" label="Cargo" v-model="selectedUser.cargo"></v-select>
          <v-text-field v-model="selectedUser.idade" type="text" label="Idade"></v-text-field>
          <v-select label="Tipo de usuário" v-model="selectedUser.tipo" :items="tipos"></v-select>
        </v-form>
      </v-sheet>
      <v-card-actions class="pr-5 mb-5">
        <v-btn class="ms-auto font-weight-bold" text="Cancelar" @click="editDialog = false"></v-btn>
        <v-btn class="ms-auto bg-green-darken-2 font-weight-bold px-4" text="Editar" @click="editUser()"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts" setup>
import { onMounted, ref, Ref } from 'vue';
import { Service } from '../../api/Service';
import { useUserStore } from '../../store/userLogged';
import { IUsuario } from '../../model/IUser';
import { Tipo } from '../../model/Enums';
import { cargos, tipos } from '../../utils/lists';
import { usuarioFactory } from '../../utils/usuarioFactory';


const userStore = useUserStore()
const editForm = ref()
const search: Ref<string> = ref("")
const users: Ref<IUsuario[]> = ref([] as IUsuario[])
const selectedUser: Ref<IUsuario> = ref({} as IUsuario)
const deletDialog: Ref<boolean> = ref(false)
const editDialog: Ref<boolean> = ref(false)
const actualPage: Ref<number> = ref(1)
const totalPages: Ref<number> = ref(0)
async function getUsers(page: number): Promise<void> {
  const { data } = await Service.getUsuarios({ _page: page })
  users.value = [...data?.data]
  actualPage.value = data.prev ? data.prev + 1 : 1
  totalPages.value = data.pages
}

function userRole(type: Tipo): string {
  return type === "1" ? "Admin" : "Comum"
}

function selectUser(user: IUsuario, action: string): void {
  selectedUser.value = { ...user }
  toogleDialog(action)
}

async function deleteUser(): Promise<void> {
  await Service.deleteUsuario(selectedUser.value.id);
  await getUsers(1);
  toogleDialog("delete")
}

async function editUser(): Promise<void> {
  const validate = validateForm()
  if (!validate) {
    return
  }
  const updateUsuario = usuarioFactory(selectedUser.value)

  await Service.updateUsuario(selectedUser.value.id, updateUsuario)
  await getUsers(1)
  toogleDialog("edit")
}

async function changeSearch() {
  const { data } = await Service.findUsuarioBy(search.value)
}

function isAdmin(): boolean {
  return userStore.userLogged?.tipo === Tipo.ADMIN
}

async function validateForm(): Promise<boolean> {
  const validate = await editForm.value?.validate()
  return validate?.valid
}

function toogleDialog(action: string): void {
  switch (action) {
    case "edit":
      editDialog.value = !editDialog.value;
      return
    case "delete":
      deletDialog.value = !deletDialog.value;
      return
  }
  return
}

async function changePage(event: number): Promise<void> {
  await getUsers(event)
}

onMounted(() => {
  getUsers(actualPage.value)
})

</script>