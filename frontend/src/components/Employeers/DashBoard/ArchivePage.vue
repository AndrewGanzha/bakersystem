<template>
<AsideMenu/>
  <v-data-table
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="archive"
    item-value="name"
    @update:options="itemsPerPage"
  >
  </v-data-table>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {supabase} from "../../../service/dataBaseConnetct";

let itemsPerPage = ref<number>(20);
let archive = ref<any[]>([]);
const headers = [
  {title: 'Вес груза', key: 'OrderWeight'},
  {title: 'Вид зерна', key: 'OrderCategory'},
  {title: 'Срок хранения', key: 'OrderPetentionPeriod'},
  {title: 'Стоимость заявки', key: 'OrderPrice'}
]


onMounted(async () => {
  let { data: Orders, error } = await supabase
    .from('Orders')
    .select('*')
    .eq('OrderIsArchive', 'true')

  archive.value = Orders;
})
</script>

<style scoped>

</style>
