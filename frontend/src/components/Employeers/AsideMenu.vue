<template>
  <v-navigation-drawer>
    <v-list-item title="Добро пожаловать!" subtitle="Хлебная база №5" style="padding-bottom: 11.5px"></v-list-item>
    <v-divider></v-divider>
    <v-list-item link title="Главная страница" @click="router.push('/dashboard')"></v-list-item>
    <v-list-item link title="Активные заказы" @click="router.push('/activeOrder')"></v-list-item>
    <v-list-item link title="Занятость помещений"></v-list-item>
    <v-list-item link title="База клиентов"></v-list-item>
    <v-list-item link title="Архив заявок"></v-list-item>
    <v-list-item link title="Спсиок сотрудников"></v-list-item>
  </v-navigation-drawer>
</template>

<style scoped>

</style>
<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter()
</script>
