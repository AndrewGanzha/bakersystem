<template>
<AsideMenu/>
  <v-data-table
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="orderStore.ordersInWork"
    item-value="name"
    @update:options="itemsPerPage"
  >
    <template v-slot:item.id="{ item }">
      <v-btn @click="archiveOrder(item)">Архивировать</v-btn>
    </template>
  </v-data-table>
</template>

<style scoped>

</style>
<script setup lang="ts">
import {onMounted, ref} from "vue";
import {orders} from "../../../stores/app";
import {getAllOrdersInWork} from "../../../service/api";
import {supabase} from "../../../service/dataBaseConnetct";

const orderStore = orders();
const headers = [
  {title: 'Вес груза', key: 'OrderWeight'},
  {title: 'Вид зерна', key: 'OrderCategory'},
  {title: 'Срок хранения', key: 'OrderPetentionPeriod'},
  {title: 'Стоимость заявки', key: 'OrderPrice'},
  {title: 'Сотрудник', key: 'EmployeeName' },
  {title: 'Номер машины', key: 'TransportId' },
  {title: '', key: 'id'}
]
let itemsPerPage = ref<number>(20)

onMounted(async () => {
  let { data: Orders, error } = await supabase
    .from('Orders')
    .select('*')
    .eq('OrderInWork', 'true')

  await orderStore.setOrdersInWork(Orders);
})

async function archiveOrder (item) {
  const { data, error } = await supabase
    .from('Orders')
    .update({ OrderIsArchive: true, OrderInWork: false })
    .eq('id', item.id)
    .select()
}
</script>
