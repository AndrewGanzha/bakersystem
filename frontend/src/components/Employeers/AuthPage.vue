<template>
  <div>
    <v-card
      class="mx-auto pa-12 pb-8 my-6"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Электронная почта</div>

      <v-text-field
        density="compact"
        v-model="email"
        placeholder="Введите эл. почту"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Пароль
      </div>

      <v-text-field
        type="password"
        density="compact"
        placeholder="Введите пароль"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        v-model="passwrod"
      ></v-text-field>

      <v-btn
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        block
        @click="tryAuth"
      >
        Авторизация
      </v-btn>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {supabase} from "../../service/dataBaseConnetct";
import {user} from "../../stores/app";

const router = useRouter()
const email = ref('')
const passwrod = ref('')
const userStore = user();

onMounted(() => {
  userStore.setUserFromServer(null);
})

async function tryAuth() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: passwrod.value,
    })

  if (error) {
    alert('Ошибка авторизации!')
  } else {

    await userStore.setUserFromServer(data.user);
    router.push('/dashboard')
  }
}



</script>
