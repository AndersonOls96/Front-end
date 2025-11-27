<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Compartilhar Link</h2>

      <div class="mb-4">
        <p class="text-sm text-gray-600 mb-2">Link: {{ link?.title }}</p>
      </div>

      <form @submit.prevent="handleShare" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email do usuário</label>
          <input
            v-model="emailToShare"
            type="email"
            placeholder="usuario@exemplo.com"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {{ error }}
        </div>

        <div v-if="success" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {{ success }}
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
        >
          {{ loading ? 'Compartilhando...' : 'Compartilhar' }}
        </button>
      </form>

      <!-- Lista de usuários com quem foi compartilhado -->
      <div v-if="link?.sharedWith && link.sharedWith.length > 0" class="mt-6 pt-6 border-t">
        <h3 class="font-semibold text-gray-900 mb-3">Compartilhado com:</h3>
        <div class="space-y-2">
          <div
            v-for="email in link.sharedWith"
            :key="email"
            class="flex justify-between items-center bg-gray-100 px-3 py-2 rounded"
          >
            <span class="text-sm text-gray-700">{{ email }}</span>
            <button
              @click="handleUnshare(email)"
              class="text-red-500 hover:text-red-700 text-sm font-semibold"
            >
              Remover
            </button>
          </div>
        </div>
      </div>

      <button
        @click="close"
        class="w-full mt-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
      >
        Fechar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { shareLink, unshareLink } from "@/services/linkService";

const props = defineProps({
  isOpen: Boolean,
  link: Object,
  userId: String,
  onClose: Function
});

const emailToShare = ref("");
const error = ref("");
const success = ref("");
const loading = ref(false);

const handleShare = async () => {
  error.value = "";
  success.value = "";

  if (!emailToShare.value.trim()) {
    error.value = "Email é obrigatório";
    return;
  }

  loading.value = true;

  try {
    await shareLink(props.userId, props.link.id, emailToShare.value);
    success.value = `Link compartilhado com ${emailToShare.value}`;
    emailToShare.value = "";
    setTimeout(() => {
      success.value = "";
    }, 3000);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const handleUnshare = async (email) => {
  if (confirm(`Remover compartilhamento com ${email}?`)) {
    try {
      await unshareLink(props.userId, props.link.id, email);
    } catch (err) {
      error.value = err.message;
    }
  }
};

const close = () => {
  emailToShare.value = "";
  error.value = "";
  success.value = "";
  props.onClose();
};
</script>