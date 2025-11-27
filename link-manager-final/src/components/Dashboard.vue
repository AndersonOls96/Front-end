<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">Meus Links</h1>
        <button
          @click="handleLogout"
          class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </header>

    <!-- Conteúdo -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Formulário de novo link -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Adicionar novo link</h2>
        <form @submit.prevent="handleAddLink" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              v-model="newLink.title"
              type="text"
              placeholder="Título do link"
              required
              class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              v-model="newLink.url"
              type="url"
              placeholder="https://exemplo.com"
              required
              class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              v-model="newLink.category"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione uma categoria</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Educação">Educação</option>
              <option value="Entretenimento">Entretenimento</option>
              <option value="Tecnologia">Tecnologia</option>
              <option value="Saúde">Saúde</option>
              <option value="Outro">Outro</option>
            </select>
            <input
              v-model="newLink.tags"
              type="text"
              placeholder="Tags (separadas por vírgula )"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <textarea
            v-model="newLink.description"
            placeholder="Descrição (opcional)"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="2"
          ></textarea>

          <button
            type="submit"
            :disabled="linkStore.loading"
            class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
          >
            {{ linkStore.loading ? 'Adicionando...' : 'Adicionar Link' }}
          </button>
        </form>
      </div>

      <!-- Filtro de categorias -->
      <div class="bg-white rounded-lg shadow p-4 mb-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-3">Filtrar por categoria</h3>
        <div class="flex flex-wrap gap-2">
          <button
            @click="linkStore.setSelectedCategory(null)"
            :class="[
              'px-4 py-2 rounded-lg transition',
              linkStore.selectedCategory === null
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            ]"
          >
            Todos ({{ linkStore.linkCount }})
          </button>

          <button
            v-for="category in linkStore.categories"
            :key="category"
            @click="linkStore.setSelectedCategory(category)"
            :class="[
              'px-4 py-2 rounded-lg transition',
              linkStore.selectedCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            ]"
          >
            {{ category }}
            ({{ links.filter((l) => l.category === category).length }})
          </button>

          <button
            @click="linkStore.setShowOnlyFavorites(!linkStore.showOnlyFavorites)"
            :class="[
              'px-4 py-2 rounded-lg transition font-semibold',
              linkStore.showOnlyFavorites
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            ]"
          >
            ⭐ Favoritos ({{ linkStore.favoritesCount }})
          </button>


        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-4 mb-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-3">Buscar links</h3>
        <div class="relative">
          <input
            v-model="linkStore.searchQuery"
            @input="linkStore.setSearchQuery($event.target.value)"
            type="text"
            placeholder="Buscar por título, descrição, URL ou tags..."
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            v-if="linkStore.searchQuery"
            @click="linkStore.clearSearch()"
            class="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        <p class="text-sm text-gray-600 mt-2">
          {{ linkStore.searchResultsCount }} resultado(s) encontrado(s)
        </p>
      </div>

      <div class="bg-white rounded-lg shadow p-4 mb-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-3">Ordenar por</h3>
        <div class="flex gap-2">
          <button
            @click="linkStore.setSortBy('createdAt')"
            :class="[
              'px-4 py-2 rounded-lg transition',
              linkStore.sortBy === 'createdAt'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            ]"
          >
            Mais recentes
          </button>
          <button
            @click="linkStore.setSortBy('clickCount')"
            :class="[
              'px-4 py-2 rounded-lg transition',
              linkStore.sortBy === 'clickCount'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            ]"
          >
            Mais populares
          </button>
          <button
            @click="linkStore.setSortBy('title')"
            :class="[
              'px-4 py-2 rounded-lg transition',
              linkStore.sortBy === 'title'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            ]"
          >
            Alfabético
          </button>
        </div>
      </div>

      <!-- Mensagem de erro -->
      <div v-if="linkStore.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {{ linkStore.error }}
      </div>

      <!-- Lista de links -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="link in linkStore.filteredLinks"
          :key="link.id"
          class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
        >
          <!-- Badge de categoria -->
          <div class="flex justify-between items-start mb-2">
            <span
              v-if="link.category"
              :class="[
                'text-xs font-semibold px-3 py-1 rounded-full',
                getCategoryColor(link.category)
              ]"
            >
              {{ link.category }}
            </span>
          </div>

          <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ link.title }}</h3>
          <p v-if="link.description" class="text-gray-600 text-sm mb-3">{{ link.description }}</p>
           <a
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            @click="linkStore.recordLinkClick(authStore.user.uid, link.id)"
            class="text-blue-500 hover:text-blue-700 text-sm break-all mb-4 block"
          >
            {{ link.url }}
          </a>

          <!-- Mostrar contador de cliques -->
          <div class="text-xs text-gray-500 mb-3">
            👁️ {{ link.clickCount || 0 }} clique(s)
          </div>

          <!-- Tags -->
          <div v-if="link.tags" class="mb-4">
            <div class="flex flex-wrap gap-1">
              <span
                v-for="tag in link.tags.split(',')"
                :key="tag"
                class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
              >
                {{ tag.trim() }}
              </span>
            </div>
          </div>

          

          <button
            @click="linkStore.toggleFavorite(authStore.user.uid, link.id, link.isFavorite)"
            :class="[
              'flex-1 px-3 py-2 rounded transition text-sm',
              link.isFavorite
                ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            ]"
          >
            {{ link.isFavorite ? '⭐ Favorito' : '☆ Adicionar aos favoritos' }}
          </button>

          <div class="flex gap-2">
            <button
              @click="editLink(link)"
              class="flex-1 bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600 transition text-sm"
            >
              Editar
            </button>
            <button
              @click="deleteLink(link.id)"
              class="flex-1 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition text-sm"
            >
              Deletar
            </button>

             <button
                @click="openShareModal(link)"
                class="flex-1 bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition text-sm"
              >
                🔗 Compartilhar
            </button>
          </div>
        </div>
      </div>

      

      <!-- Mensagem quando não há links -->
      <div v-if="linkStore.filteredLinks.length === 0" class="text-center py-12">
        <p class="text-gray-500 text-lg">Nenhum link nesta categoria. Comece adicionando um!</p>
      </div>
    </main>
  </div>

  <EditLinkModal
    :isOpen="isEditModalOpen"
    :link="editingLink"
    :loading="linkStore.loading"
    @save="handleSaveEdit"
    @close="closeEditModal"
  />

  <ShareLinkModal
    :isOpen="isShareModalOpen"
    :link="sharingLink"
    :userId="authStore.user?.uid"
    @close="closeShareModal"
  />
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useLinkStore } from "@/stores/linkStore";
import { useRouter } from "vue-router";
import EditLinkModal from "@/components/EditLinkModal.vue";
import ShareLinkModal from "@/components/ShareLinkModal.vue";


const authStore = useAuthStore();
const linkStore = useLinkStore();
const router = useRouter();

const editingLink = ref(null);
const isEditModalOpen = ref(false);

const editLink = (link) => {
  editingLink.value = link;
  isEditModalOpen.value = true;
};

const newLink = ref({
  title: "",
  url: "",
  description: "",
  category: "",
  tags: ""
});

const links = computed(() => linkStore.links);

const getCategoryColor = (category) => {
  const colors = {
    "Trabalho": "bg-blue-100 text-blue-800",
    "Educação": "bg-purple-100 text-purple-800",
    "Entretenimento": "bg-pink-100 text-pink-800",
    "Tecnologia": "bg-green-100 text-green-800",
    "Saúde": "bg-red-100 text-red-800",
    "Outro": "bg-gray-100 text-gray-800"
  };
  return colors[category] || "bg-gray-100 text-gray-800";
};

const handleAddLink = async () => {
  try {
    await linkStore.createLink(authStore.user.uid, {
      title: newLink.value.title,
      url: newLink.value.url,
      description: newLink.value.description,
      category: newLink.value.category,
      tags: newLink.value.tags
    });
    newLink.value = { title: "", url: "", description: "", category: "", tags: "" };
  } catch (error) {
    console.error("Erro ao adicionar link:", error);
  }
};


const deleteLink = async (linkId) => {
  if (confirm("Tem certeza que deseja deletar este link?")) {
    try {
      await linkStore.removeLink(authStore.user.uid, linkId);
    } catch (error) {
      console.error("Erro ao deletar link:", error);
    }
  }
};

const handleLogout = async () => {
  try {
    await authStore.logout();
    linkStore.clearLinks();
    router.push("/");
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
  }
};

onMounted(() => {
  if (authStore.user) {
    linkStore.subscribeToLinks(authStore.user.uid);
  }
});

onUnmounted(() => {
  linkStore.unsubscribeFromLinks();
});

const handleSaveEdit = async (formData) => {
  try {
    await linkStore.editLink(authStore.user.uid, editingLink.value.id, formData);
    isEditModalOpen.value = false;
    editingLink.value = null;
  } catch (error) {
    console.error("Erro ao editar link:", error);
  }
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
  editingLink.value = null;
};

const sharingLink = ref(null);
const isShareModalOpen = ref(false);

const openShareModal = (link) => {
  sharingLink.value = link;
  isShareModalOpen.value = true;
};

const closeShareModal = () => {
  isShareModalOpen.value = false;
  sharingLink.value = null;
};
</script>