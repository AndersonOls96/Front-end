// src/stores/linkStore.js
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
import { incrementClickCount } from "@/services/linkService";


export const useLinkStore = defineStore("links", () => {
  const links = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const selectedCategory = ref(null);
  const searchQuery = ref("");
  const showOnlyFavorites = ref(false);
  const sortBy = ref("createdAt");
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

  const recordLinkClick = async (userId, linkId) => {
    try {
      await incrementClickCount(userId, linkId);
    } catch (error) {
      console.error("Erro ao registrar clique:", error);
    }
  };

  
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

  const setSearchQuery = (query) => {
    searchQuery.value = query;
  };

  const clearSearch = () => {
    searchQuery.value = "";
  };

  const setSelectedCategory = (category) => {
    selectedCategory.value = category;
  };

  const clearLinks = () => {
    links.value = [];
    unsubscribeFromLinks();
  };

  const setShowOnlyFavorites = (show) => {
    showOnlyFavorites.value = show;
  };

  const setSortBy = (field) => {
    sortBy.value = field;
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
    clearLinks,
    searchResultsCount,
    setSearchQuery,
    clearSearch,
    showOnlyFavorites,
    favoritesCount,
    toggleFavorite,
    setShowOnlyFavorites,
    sortBy,
    sortedAndFilteredLinks,
    recordLinkClick,
    setSortBy

  };
});