<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
    <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">Link Manager</h1>

      <!-- Abas de Login/Registro -->
      <div class="flex gap-4 mb-6">
        <button
          @click="isLogin = true"
          :class="[
            'flex-1 py-2 px-4 rounded-lg font-semibold transition',
            isLogin
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          ]"
        >
          Login
        </button>
        <button
          @click="isLogin = false"
          :class="[
            'flex-1 py-2 px-4 rounded-lg font-semibold transition',
            !isLogin
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          ]"
        >
          Registrar
        </button>
      </div>

      <!-- Formulário -->
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="seu@email.com"
          />
        </div>

        <!-- Senha -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Senha
          </label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
        </div>

        <!-- Mensagem de erro -->
        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {{ error }}
        </div>

        <!-- Botão de envio -->
        <button
          type="submit"
          :disabled="authStore.loading"
          class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition disabled:opacity-50"
        >
          {{ authStore.loading ? 'Processando...' : (isLogin ? 'Entrar' : 'Registrar') }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const error = ref("");
const isLogin = ref(true);

const handleSubmit = async () => {
  error.value = "";

  try {
    if (isLogin.value) {
      await authStore.login(email.value, password.value);
    } else {
      await authStore.register(email.value, password.value);
    }
    router.push("/dashboard");
  } catch (err) {
    error.value = err.message;
  }
};
</script>