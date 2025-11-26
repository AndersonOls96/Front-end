# Resolução dos Exercícios Práticos - Firebase com Vue.js

**Autor:** Manus AI**Nível:** Intermediário**Data:** Novembro de 2025

---

## Índice

1. [Exercício 1: Adicionar Categorias aos Links](#exerc%C3%ADcio-1-adicionar-categorias-aos-links)

1. [Exercício 2: Implementar Busca de Links](#exerc%C3%ADcio-2-implementar-busca-de-links)

1. [Exercício 3: Adicionar Funcionalidade de Favoritos](#exerc%C3%ADcio-3-adicionar-funcionalidade-de-favoritos)

1. [Exercício 4: Implementar Edição de Links](#exerc%C3%ADcio-4-implementar-edi%C3%A7%C3%A3o-de-links)

1. [Exercício 5: Adicionar Contagem de Cliques](#exerc%C3%ADcio-5-adicionar-contagem-de-cliques)

1. [Exercício 6: Implementar Compartilhamento de Links](#exerc%C3%ADcio-6-implementar-compartilhamento-de-links)

---

## Exercício 1: Adicionar Categorias aos Links

### Objetivo

Estender o modelo de dados para incluir categorias e permitir filtrar links por categoria.

### Passo 1: Atualizar o serviço de links

Modifique `src/services/linkService.js` para adicionar uma função de busca por categoria:

```javascript
// src/services/linkService.js

/**
 * Obtém links filtrados por categoria
 * @param {string} userId - ID do usuário
 * @param {string} category - Categoria para filtrar
 * @returns {Promise} Promessa com array de links da categoria
 */
export const getLinksByCategory = async (userId, category) => {
  try {
    const linksRef = collection(db, "users", userId, "links");
    const q = query(
      linksRef,
      where("category", "==", category),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    throw new Error(`Erro ao buscar links por categoria: ${error.message}`);
  }
};

/**
 * Obtém todas as categorias únicas do usuário
 * @param {string} userId - ID do usuário
 * @returns {Promise} Promessa com array de categorias
 */
export const getUserCategories = async (userId) => {
  try {
    const links = await getUserLinks(userId);
    const categories = [...new Set(links.map((link) => link.category))];
    return categories.filter((cat) => cat); // Remove undefined
  } catch (error) {
    throw new Error(`Erro ao buscar categorias: ${error.message}`);
  }
};
```

### Passo 2: Atualizar o store de links

Modifique `src/stores/linkStore.js`:

```javascript
// src/stores/linkStore.jsvu
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
  addLink,
  getUserLinks,
  onUserLinksChanged,
  updateLink,
  deleteLink,
  getLinksByCategory,
  getUserCategories
} from "@/services/linkService";

export const useLinkStore = defineStore("links", () => {
  const links = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const selectedCategory = ref(null);
  let unsubscribe = null;

  // Computed properties
  const linkCount = computed(() => links.value.length);

  const filteredLinks = computed(() => {
    if (!selectedCategory.value) {
      return links.value;
    }
    return links.value.filter((link) => link.category === selectedCategory.value);
  });

  const categories = computed(() => {
    const cats = [...new Set(links.value.map((link) => link.category))];
    return cats.filter((cat) => cat).sort();
  });

  // Actions
  const createLink = async (userId, linkData) => {
    loading.value = true;
    error.value = null;
    try {
      const linkId = await addLink(userId, linkData);
      return linkId;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchLinks = async (userId) => {
    loading.value = true;
    error.value = null;
    try {
      const userLinks = await getUserLinks(userId);
      links.value = userLinks;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const subscribeToLinks = (userId) => {
    unsubscribe = onUserLinksChanged(userId, (userLinks) => {
      links.value = userLinks;
    });
  };

  const unsubscribeFromLinks = () => {
    if (unsubscribe) {
      unsubscribe();
    }
  };

  const editLink = async (userId, linkId, updateData) => {
    loading.value = true;
    error.value = null;
    try {
      await updateLink(userId, linkId, updateData);
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const removeLink = async (userId, linkId) => {
    loading.value = true;
    error.value = null;
    try {
      await deleteLink(userId, linkId);
      links.value = links.value.filter((link) => link.id !== linkId);
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const setSelectedCategory = (category) => {
    selectedCategory.value = category;
  };

  const clearLinks = () => {
    links.value = [];
    selectedCategory.value = null;
    unsubscribeFromLinks();
  };

  return {
    links,
    loading,
    error,
    linkCount,
    selectedCategory,
    filteredLinks,
    categories,
    createLink,
    fetchLinks,
    subscribeToLinks,
    unsubscribeFromLinks,
    editLink,
    removeLink,
    setSelectedCategory,
    clearLinks
  };
});
```

### Passo 3: Atualizar o componente Dashboard

Modifique `src/components/Dashboard.vue`:

```javascript
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
            class="text-blue-500 hover:text-blue-700 text-sm break-all mb-4 block"
          >
            {{ link.url }}
          </a>

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
          </div>
        </div>
      </div>

      <!-- Mensagem quando não há links -->
      <div v-if="linkStore.filteredLinks.length === 0" class="text-center py-12">
        <p class="text-gray-500 text-lg">Nenhum link nesta categoria. Comece adicionando um!</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useLinkStore } from "@/stores/linkStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const linkStore = useLinkStore();
const router = useRouter();

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

const editLink = (link) => {
  console.log("Editar link:", link);
  // Implementar edição (próximo exercício)
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
</script>
```

---

## Exercício 2: Implementar Busca de Links

### Objetivo

Adicionar funcionalidade de busca em tempo real nos links.

### Solução

Modifique `src/stores/linkStore.js` para adicionar busca:

```javascript
// src/stores/linkStore.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useLinkStore = defineStore("links", () => {
  const links = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const selectedCategory = ref(null);
  const searchQuery = ref("");
  let unsubscribe = null;

  // Computed properties
  const linkCount = computed(() => links.value.length);

  const filteredLinks = computed(() => {
    let result = links.value;

    // Filtrar por categoria
    if (selectedCategory.value) {
      result = result.filter((link) => link.category === selectedCategory.value);
    }

    // Filtrar por busca
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter((link) => {
        return (
          link.title.toLowerCase().includes(query) ||
          link.description?.toLowerCase().includes(query) ||
          link.url.toLowerCase().includes(query) ||
          link.tags?.toLowerCase().includes(query)
        );
      });
    }

    return result;
  });

  const categories = computed(() => {
    const cats = [...new Set(links.value.map((link) => link.category))];
    return cats.filter((cat) => cat).sort();
  });

  const searchResultsCount = computed(() => filteredLinks.value.length);

  // Actions
  const setSearchQuery = (query) => {
    searchQuery.value = query;
  };

  const clearSearch = () => {
    searchQuery.value = "";
  };

  const setSelectedCategory = (category) => {
    selectedCategory.value = category;
  };

  // ... resto das actions
});
```

Atualize o componente `Dashboard.vue` para adicionar a barra de busca:

```javascript
<!-- Adicione isto após o filtro de categorias -->
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
```

---

## Exercício 3: Adicionar Funcionalidade de Favoritos

### Objetivo

Permitir marcar links como favoritos e filtrá-los.

### Solução

Atualize `src/stores/linkStore.js`:

```javascript
export const useLinkStore = defineStore("links", () => {
  // ... código anterior

  const showOnlyFavorites = ref(false);

  const filteredLinks = computed(() => {
    let result = links.value;

    // Filtrar por categoria
    if (selectedCategory.value) {
      result = result.filter((link) => link.category === selectedCategory.value);
    }

    // Filtrar por busca
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter((link) => {
        return (
          link.title.toLowerCase().includes(query) ||
          link.description?.toLowerCase().includes(query) ||
          link.url.toLowerCase().includes(query) ||
          link.tags?.toLowerCase().includes(query)
        );
      });
    }

    // Filtrar por favoritos
    if (showOnlyFavorites.value) {
      result = result.filter((link) => link.isFavorite);
    }

    return result;
  });

  const favoritesCount = computed(() => links.value.filter((l) => l.isFavorite).length);

  const toggleFavorite = async (userId, linkId, currentState) => {
    loading.value = true;
    error.value = null;
    try {
      await updateLink(userId, linkId, {
        isFavorite: !currentState
      });
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const setShowOnlyFavorites = (show) => {
    showOnlyFavorites.value = show;
  };

  return {
    // ... outras propriedades
    showOnlyFavorites,
    favoritesCount,
    toggleFavorite,
    setShowOnlyFavorites
  };
});
```

Atualize o componente `Dashboard.vue`:

```javascript
<!-- Adicione um botão para filtrar favoritos -->
<div class="flex gap-2 mb-6">
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

<!-- No card do link, adicione um botão de favorito -->
<div class="flex gap-2">
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
  <button
    @click="editLink(link)"
    class="flex-1 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition text-sm"
  >
    Editar
  </button>
  <button
    @click="deleteLink(link.id)"
    class="flex-1 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition text-sm"
  >
    Deletar
  </button>
</div>
```

---

## Exercício 4: Implementar Edição de Links

### Objetivo

Completar a funcionalidade de edição de links com modal e validação.

### Solução

Crie um novo componente `src/components/EditLinkModal.vue`:

```javascript
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
```

Atualize `Dashboard.vue`:

```javascript
<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import EditLinkModal from "@/components/EditLinkModal.vue";

// ... outras importações

const editingLink = ref(null);
const isEditModalOpen = ref(false);

const editLink = (link) => {
  editingLink.value = link;
  isEditModalOpen.value = true;
};

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
</script>

<template>
  <!-- Adicione o modal -->
  <EditLinkModal
    :isOpen="isEditModalOpen"
    :link="editingLink"
    :loading="linkStore.loading"
    @save="handleSaveEdit"
    @close="closeEditModal"
  />

  <!-- ... resto do template -->
</template>
```

---

## Exercício 5: Adicionar Contagem de Cliques

### Objetivo

Rastrear quantas vezes cada link foi clicado.

### Solução

Atualize `src/services/linkService.js`:

```javascript
/**
 * Incrementa o contador de cliques de um link
 * @param {string} userId - ID do usuário
 * @param {string} linkId - ID do link
 * @returns {Promise} Promessa que resolve quando atualização é concluída
 */
export const incrementClickCount = async (userId, linkId) => {
  try {
    const docRef = doc(db, "users", userId, "links", linkId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const currentCount = docSnap.data().clickCount || 0;
      await updateDoc(docRef, {
        clickCount: currentCount + 1,
        lastClickedAt: new Date()
      });
    }
  } catch (error) {
    throw new Error(`Erro ao incrementar cliques: ${error.message}`);
  }
};
```

Atualize `src/stores/linkStore.js`:

```javascript
import { incrementClickCount } from "@/services/linkService";

export const useLinkStore = defineStore("links", () => {
  // ... código anterior

  const sortBy = ref("createdAt"); // "createdAt", "clickCount", "title"

  const sortedAndFilteredLinks = computed(() => {
    let result = [...filteredLinks.value];

    if (sortBy.value === "clickCount") {
      result.sort((a, b) => (b.clickCount || 0) - (a.clickCount || 0));
    } else if (sortBy.value === "title") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  });

  const recordLinkClick = async (userId, linkId) => {
    try {
      await incrementClickCount(userId, linkId);
    } catch (error) {
      console.error("Erro ao registrar clique:", error);
    }
  };

  const setSortBy = (field) => {
    sortBy.value = field;
  };

  return {
    // ... outras propriedades
    sortBy,
    sortedAndFilteredLinks,
    recordLinkClick,
    setSortBy
  };
});
```

Atualize `Dashboard.vue`:

```javascript
<!-- Adicione seletor de ordenação -->
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

<!-- No card do link, adicione contador de cliques -->
<div v-for="link in linkStore.sortedAndFilteredLinks" :key="link.id" class="bg-white rounded-lg shadow p-6">
  <!-- ... conteúdo anterior -->

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

  <!-- ... resto do card -->
</div>
```

---

## Exercício 6: Implementar Compartilhamento de Links

### Objetivo

Permitir compartilhar links com outros usuários.

### Solução

Atualize `src/services/linkService.js`:

```javascript
/**
 * Compartilha um link com outro usuário
 * @param {string} ownerId - ID do proprietário do link
 * @param {string} linkId - ID do link
 * @param {string} sharedWithEmail - Email do usuário com quem compartilhar
 * @returns {Promise} Promessa que resolve quando compartilhamento é concluído
 */
export const shareLink = async (ownerId, linkId, sharedWithEmail) => {
  try {
    const docRef = doc(db, "users", ownerId, "links", linkId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const sharedWith = docSnap.data().sharedWith || [];
      if (!sharedWith.includes(sharedWithEmail)) {
        sharedWith.push(sharedWithEmail);
        await updateDoc(docRef, {
          sharedWith: sharedWith,
          sharedAt: new Date()
        });
      }
    }
  } catch (error) {
    throw new Error(`Erro ao compartilhar link: ${error.message}`);
  }
};

/**
 * Remove compartilhamento de um link
 * @param {string} ownerId - ID do proprietário do link
 * @param {string} linkId - ID do link
 * @param {string} email - Email do usuário a remover
 * @returns {Promise} Promessa que resolve quando remoção é concluída
 */
export const unshareLink = async (ownerId, linkId, email) => {
  try {
    const docRef = doc(db, "users", ownerId, "links", linkId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const sharedWith = (docSnap.data().sharedWith || []).filter((e) => e !== email);
      await updateDoc(docRef, {
        sharedWith: sharedWith
      });
    }
  } catch (error) {
    throw new Error(`Erro ao remover compartilhamento: ${error.message}`);
  }
};
```

Crie um novo componente `src/components/ShareLinkModal.vue`:

```javascript
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
```

Atualize `Dashboard.vue`:

```javascript
<script setup>
import { ref } from "vue";
import ShareLinkModal from "@/components/ShareLinkModal.vue";

// ... outras importações

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

<template>
  <!-- Adicione o modal -->
  <ShareLinkModal
    :isOpen="isShareModalOpen"
    :link="sharingLink"
    :userId="authStore.user?.uid"
    @close="closeShareModal"
  />

  <!-- No card do link, adicione botão de compartilhamento -->
  <div class="flex gap-2">
    <button
      @click="openShareModal(link)"
      class="flex-1 bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition text-sm"
    >
      🔗 Compartilhar
    </button>
    <!-- ... outros botões -->
  </div>
</template>
```

---
