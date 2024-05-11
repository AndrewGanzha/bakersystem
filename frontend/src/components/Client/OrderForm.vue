<template>
    <v-card class="mx-auto px-3" width="400">
      <v-btn class="mt-2" type="submit" block @click="router.push('.')">Вернуться назад</v-btn>

      <v-card-text>Пожалуйста, укажите полную информацию о заказе, а также корректные контактные данные, чтобы мы смогли связаться с Вами для утверждения заявки</v-card-text>
      <v-form @submit.prevent>

        <div>
          <v-text-field
            v-model="formCustomerValue.CustomerName"
            label="Введите ФИО в формате: Фамилия И.О."
          ></v-text-field>

          <v-text-field
            v-model="formCustomerValue.CustomerEmail"
            label="Электронная почта"
          ></v-text-field>

          <v-text-field
            v-model="formCustomerValue.CustomerPhone"
            label="Номер телефона"
          ></v-text-field>

          <v-select
            :items="orderTypes"
            v-model="formOrderValue.OrderCategory"
            label="Вид груза"
          ></v-select>

          <v-text-field
            v-model="formOrderValue.OrderWeight"
            label="Масса груза в кг."
          ></v-text-field>

          <v-text-field
            v-model="formCustomerValue.CustomerPayment"
            label="Номер банковского счета"
          ></v-text-field>

          <v-text-field
            v-model="formOrderValue.OrderPetentionPeriod"
            label="Срок хранения в днях"
          ></v-text-field>
        </div>

        <v-checkbox label="Нужна ли транспортировка?" v-model="formOrderValue.OrderIsTransporting"/>

        <div v-if="formOrderValue.OrderIsTransporting">
          <v-text-field
            v-model="formOrderValue.OrderDate"
            label="Дата отправки"
          ></v-text-field>

          <v-text-field
            v-model="formOrderValue.OrderAddress"
            label="Место отправки"
          ></v-text-field>
        </div>

        <div v-else>
          <v-text-field
            v-model="formOrderValue.OrderDate"
            label="Дата принятия груза предприятием"
          ></v-text-field>
        </div>
        <v-btn class="mt-2" type="submit" block @click="sendOrder">Отправить заявку</v-btn>
      </v-form>

      <v-card-text>Предварительная стоимость: {{ price }} ₽</v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import {computed, reactive} from "vue";
import {CustomerType, OrderType} from "../../types/types";
import {supabase} from "../../service/dataBaseConnetct";
import {useRouter} from "vue-router";

const orderTypes = ['Цельнозерновые', 'Фасовонно-зерновые']
const router = useRouter();

const formCustomerValue: CustomerType = reactive({
  CustomerName: '',
  CustomerEmail: '',
  CustomerPhone: null,
  CustomerPayment: null
})

const formOrderValue: OrderType = reactive({
  OrderCategory: '',
  OrderWeight: null,
  OrderPetentionPeriod: null,
  OrderIsTransporting: false,
  OrderDate: '',
  OrderAddress: ''
})

let number = 222;

async function sendOrder() {
  const { customerData, customerError } = await supabase
    .from('Customers')
    .insert([
      {
        CustomerPhone: formCustomerValue.CustomerPhone,
        CustomerPayment: formCustomerValue.CustomerPayment,
        CustomerEmail: formCustomerValue.CustomerEmail,
        CustomerName: formCustomerValue.CustomerName
      }
    ])
    .select()

  const { orderData, orderError } = await supabase
    .from('Orders')
    .insert([
      { OrderDate: formOrderValue.OrderDate,
        OrderPrice: price.value,
        OrderCategory: formOrderValue.OrderCategory,
        OrderWeight: formOrderValue.OrderWeight,
        OrderIsTransporting: formOrderValue.OrderIsTransporting,
        OrderPetentionPeriod: formOrderValue.OrderPetentionPeriod,
        OrderAdress: formOrderValue.OrderAddress
      },
    ])
    .select()
}

const price = computed(() => {
  let oneDayKeepPrice = 5000;
  let fixPriceTransport = Math.floor(formOrderValue.OrderWeight / 1000) ? Math.floor(formOrderValue.OrderWeight / 1000) * 20000 : 20000;

  if (formOrderValue.OrderIsTransporting) {
    return formOrderValue.OrderPetentionPeriod * oneDayKeepPrice + fixPriceTransport
  }

  return formOrderValue.OrderPetentionPeriod * oneDayKeepPrice;
})


</script>

<style scoped>

</style>
