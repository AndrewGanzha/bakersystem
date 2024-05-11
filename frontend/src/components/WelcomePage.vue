<template>
    <v-card
      class="mx-auto my-15"
      max-width="344"
      hover
    >
      <v-card-item>
        <v-card-title>
          Хлебная база №5
        </v-card-title>

        <v-card-subtitle>
          Добро пожаловать!
        </v-card-subtitle>
      </v-card-item>

      <v-card-text>
        Вас приветствует система по оформлению заявок на транспортировку и хранения аграрно-зерновых культур "Воронежская хлебная база"
      </v-card-text>

      <v-card-text>
        Пожалуйста, перейдите по необходимой для Вас ссылке!
      </v-card-text>

      <v-btn-group class="d-flex justify-lg-space-around">
        <v-btn @click="goToForm">Я клиент</v-btn>
        <v-btn @click="goToAuth">Я сотрудник</v-btn>
      </v-btn-group>
    </v-card>
</template>

<script setup>
const router = useRouter()

function goToForm() {
  router.push('/order')
}

function goToAuth() {
  router.push('/auth')
}
</script>
