<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Loading spinner enquanto verifica autenticação -->
    <div v-if="authStore.loading && !authStore.user" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p class="mt-4 text-gray-600">Carregando...</p>
      </div>
    </div>

    <!-- Renderizar componente baseado no estado de autenticação -->
    <template v-else>
      <!-- Se não está autenticado, mostrar página de login -->
      <LoginForm v-if="!authStore.isAuthenticated" />

      <!-- Se está autenticado, mostrar dashboard -->
      <Dashboard v-else />
    </template>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import LoginForm from "@/components/LoginForm.vue";
import Dashboard from "@/components/Dashboard.vue";

const authStore = useAuthStore();

// Inicializar listener de autenticação quando o componente é montado
onMounted(() => {
  authStore.initAuthListener();
});
</script>

<style scoped>
/* Estilos globais podem ser adicionados aqui se necessário */
</style>
