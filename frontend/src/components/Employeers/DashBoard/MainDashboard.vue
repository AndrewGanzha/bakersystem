<template>
<AsideMenu/>

  <v-data-table
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="orders"
    item-value="name"
    @update:options="itemsPerPage"
  >
    <template v-slot:item.OrderIsTransporting="{ value }">
      <div class="d-flex">
        {{ value ? 'Да' : 'Нет' }}
        <button v-if="value">Назначить ответственного</button>
      </div>
    </template>
  </v-data-table>
</template>

<script setup>
import AsideMenu from "../AsideMenu";
import { supabase } from "../../../service/dataBaseConnetct";
import { ref } from 'vue';

let orders = ref([]);
const itemsPerPage = ref(20);
const headers = [
  {title: 'Вес груза', key: 'OrderWeight'},
  {title: 'Вид зерна', key: 'OrderCategory'},
  {title: 'Стоимость заявки', key: 'OrderPrice'},
  {title: 'Нужна ли перевозка?', key: 'OrderIsTransporting' }
]

onMounted(async () => {
  let { data: Orders, error } = await supabase
    .from('Orders')
    .select('*')

  orders.value = Orders;
})
</script>


