<template>
<AsideMenu/>
  <v-data-table
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="employeers"
    item-value="name"
    @update:options="itemsPerPage"
  >
  </v-data-table>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {supabase} from "../../../service/dataBaseConnetct";

let itemsPerPage = ref<number>(20)
let employeers = ref<any[]>([]);

const headers = [
  {title: 'ФИО Сотрудника', key: 'EmployeeName'},
  {title: 'Занятость сотрудника', key: 'EmployeeIsBusy'}
]

onMounted(async () => {
  let { data: Employeers, error } = await supabase
    .from('Employeers')
    .select('*')

  employeers.value = Employeers;
})
</script>

<style scoped>

</style>
