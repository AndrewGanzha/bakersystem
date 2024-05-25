<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="surface-variant"
        text="Назначить ответственного"
        variant="flat"
      ></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
        <v-card title="Оформление заявки">

        <div>
          <v-card-text>Данные о заявке</v-card-text>
          <v-text-field disabled v-for="item in filledOrder">
            {{ item }}
          </v-text-field>
        </div>

        <div>
          <v-card-text>Введите данные о работе</v-card-text>

          <v-select label="Выберите гос.номер авто" v-if="order.OrderIsTransporting" :items="transportNumbers" v-model="selectTransport" />

          <v-select label="Выберите сотрудника на заявку" :items="employeeNames" v-model="selectEmployee"/>
        </div>
        <v-card-actions >
          <v-spacer></v-spacer>
          <v-btn
            text="Закрыть окно оформления"
            @click="isActive.value = false"
          ></v-btn>

          <v-btn @click="postNewOrder">Офоромить заявку</v-btn>
        </v-card-actions>


      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import {computed, defineProps, onMounted, ref, watch} from "vue";
import {getAllFreeEmployeers, getAllFreeTransport} from "../../../service/api";
import {supabase} from "../../../service/dataBaseConnetct";

let filledOrder = computed(() => {
  let defaultObj = props.order;
  const cleanedObj = {};

  for (const key in defaultObj) {
    if (defaultObj[key] !== null && defaultObj[key] !== undefined && typeof defaultObj[key] !== "boolean")  {
      cleanedObj[key] = defaultObj[key];
    }
  }

  return cleanedObj;
})
let transportNumbers = ref([]);
let employeeNames = ref([]);

let selectTransport = ref<number>()
let selectEmployee = ref<string>('')

let props = defineProps({
  order: Object
})

onMounted(async () => {
  transportNumbers.value = await getAllFreeTransport();
  employeeNames.value = await getAllFreeEmployeers();
})

async function postNewOrder() {
  const { data, error } = await supabase
    .from('Orders')
    .update({ TransportId: selectTransport.value, EmployeeName: selectEmployee.value })
    .eq('id', props.order.id)
    .select()

  await setEmployeerBusy()
  await setTransportBusy()
}

async function setEmployeerBusy() {
  const { data, error } = await supabase
    .from('Employeers')
    .update({ EmployeeIsBusy: true })
    .eq('EmployeeName', selectEmployee.value)
    .select()

}

async function setTransportBusy() {
  const { data, error } = await supabase
    .from('Transport')
    .update({ TransportIsBusy: true })
    .eq('TransportNumber', selectTransport.value)
    .select()

}
</script>

<style scoped>

</style>
