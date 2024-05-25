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
          <v-text-field v-for="item in order">
            {{ item }}
          </v-text-field>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Закрыть окно оформления"
            @click="isActive.value = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

let props = defineProps({
  order: Object
})
</script>

<style scoped>

</style>
