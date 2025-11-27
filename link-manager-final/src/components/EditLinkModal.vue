<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Editar Link</h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input
            v-model="formData.title"
            type="text"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">URL</label>
          <input
            v-model="formData.url"
            type="url"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <textarea
            v-model="formData.description"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
          <select
            v-model="formData.category"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione uma categoria</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Educação">Educação</option>
            <option value="Entretenimento">Entretenimento</option>
            <option value="Tecnologia">Tecnologia</option>
            <option value="Saúde">Saúde</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tags</label>
          <input
            v-model="formData.tags"
            type="text"
            placeholder="Separadas por vírgula"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {{ error }}
        </div>

        <div class="flex gap-2">
          <button
            type="submit"
            :disabled="loading"
            class="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
          >
            {{ loading ? 'Salvando...' : 'Salvar' }}
          </button>
          <button
            type="button"
            @click="close"
            class="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  isOpen: Boolean,
  link: Object,
  loading: Boolean,
  onSave: Function,
  onClose: Function
});

const error = ref("");

const formData = computed({
  get() {
    if (props.link) {
      return {
        title: props.link.title || "",
        url: props.link.url || "",
        description: props.link.description || "",
        category: props.link.category || "",
        tags: props.link.tags || ""
      };
    }
    return { title: "", url: "", description: "", category: "", tags: "" };
  },
  set(value) {
    // Não precisa fazer nada aqui
  }
});

const handleSubmit = async () => {
  error.value = "";

  if (!formData.value.title.trim()) {
    error.value = "Título é obrigatório";
    return;
  }

  if (!formData.value.url.trim()) {
    error.value = "URL é obrigatória";
    return;
  }

  try {
    await props.onSave(formData.value);
  } catch (err) {
    error.value = err.message;
  }
};

const close = () => {
  error.value = "";
  props.onClose();
};
</script>