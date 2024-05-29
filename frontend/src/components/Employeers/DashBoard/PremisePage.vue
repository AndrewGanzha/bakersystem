<template>
<AsideMenu/>
  <div class="premise">
    <h2>Занятость помещений</h2>

    <div class="premise-container">
      <p><b>Фактическая занятость помещений:</b> 980 кг</p>
      <p><b>Потенциальная занятость помещений занятость помещений:</b> 1100 кг</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import AsideMenu from "../AsideMenu.vue";
import {orders} from "../../../stores/app";
import {onMounted, ref} from "vue";

const orderStore = orders();
const factsWeight = ref<number>(0);

onMounted(() => {

  if (orderStore.ordersInWork) {
    let result = orderStore.ordersInWork.reduce(function (a, b) {
      return a + b.OrderWeight;
    }, 0)

    console.log(result);
  }
})

</script>

<style scoped lang="scss">
.premise {
  padding: 15px 30px;
}
</style>
