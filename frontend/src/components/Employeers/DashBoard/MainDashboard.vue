<template>
<AsideMenu/>

  <v-data-table
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="orders"
    item-value="name"
    @update:options="itemsPerPage"
  >
    <template v-slot:item.OrderWeight="{ value }">
      {{ value }} кг
    </template>

    <template v-slot:item.OrderPrice="{ value }">
      {{ value }} ₽
    </template>

    <template v-slot:item.OrderPetentionPeriod="{ value }">
      {{ value }} дней
    </template>

    <template v-slot:item.OrderIsTransporting="{ value }">
      <div class="d-inline-flex align-center">
        <span style="width: 15px; margin-right: 30px">{{ value ? 'Да' : 'Нет' }}</span>
      </div>
    </template>

    <template v-slot:item.id="{ item }">
      <OrderModal :order="item" />
    </template>
  </v-data-table>

</template>

<script setup>
import AsideMenu from "../AsideMenu";
import { supabase } from "../../../service/dataBaseConnetct";
import { ref } from 'vue';
import OrderModal from "./OrderModal";

let orders = ref([]);
const itemsPerPage = ref(20);
const headers = [
  {title: 'Вес груза', key: 'OrderWeight'},
  {title: 'Вид зерна', key: 'OrderCategory'},
  {title: 'Срок хранения', key: 'OrderPetentionPeriod'},
  {title: 'Стоимость заявки', key: 'OrderPrice'},
  {title: 'Нужна ли перевозка?', key: 'OrderIsTransporting' },
  {title: 'Адрес', key: 'OrderAdress' },
  {title: '', key: 'id'}
]

onMounted(async () => {
  let { data: Orders, error } = await supabase
    .from('Orders')
    .select('*')

  orders.value = Orders;
})
</script>

<style scoped>
button {
  border: 2px solid #efebe9;
  border-radius: 5px;
  padding: 5px;
  margin-left: 30px;
}
</style>

