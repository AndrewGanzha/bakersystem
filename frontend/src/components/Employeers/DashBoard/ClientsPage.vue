<template>
  <AsideMenu/>
  <v-data-table
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="customers"
    item-value="name"
    @update:options="itemsPerPage"
  >
  </v-data-table>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {supabase} from "../../../service/dataBaseConnetct";

const headers = [
  {title: 'ФИО Заказчика', key: 'CustomerName'},
  {title: 'Эл. почта', key: 'CustomerEmail'},
  {title: 'Номер телефона', key: 'CustomerPhone'},
]

let customers = ref<any[]>([])
let itemsPerPage = ref<number>(20)

onMounted(async () => {
  let { data: Customers, error } = await supabase
    .from('Customers')
    .select('*')

  customers.value = Customers;
})
</script>

<style scoped>

</style>
