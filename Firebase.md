# Guia Prático: Firebase com Vue.js e Tailwind CSS

**Autor:** Manus AI  
**Nível:** Intermediário  
**Pré-requisitos:** Conhecimento em Vue.js 3 e Tailwind CSS

---

## Índice

1. [Introdução ao Firebase](#introdução-ao-firebase)
2. [Entendendo o Firestore](#entendendo-o-firestore)
3. [Entendendo o Firebase Authentication](#entendendo-o-firebase-authentication)
4. [Configuração Inicial do Projeto](#configuração-inicial-do-projeto)
5. [Implementando Autenticação](#implementando-autenticação)
6. [Operações CRUD com Firestore](#operações-crud-com-firestore)
7. [Integração com Vue.js](#integração-com-vuejs)
8. [Estilização com Tailwind CSS](#estilização-com-tailwind-css)
9. [Exercícios Práticos](#exercícios-práticos)
10. [Referências](#referências)

---

## Introdução ao Firebase

Firebase é uma plataforma de desenvolvimento de aplicativos oferecida pelo Google que fornece um conjunto de ferramentas e serviços para construir aplicações web e mobile de forma rápida e escalável [1]. A plataforma inclui diversos serviços como autenticação, banco de dados em tempo real, armazenamento de arquivos, hospedagem e muito mais.

### Por que usar Firebase?

| Vantagem | Descrição |
|----------|-----------|
| **Sem servidor (Serverless)** | Você não precisa gerenciar servidores, o Firebase cuida da infraestrutura |
| **Escalabilidade automática** | Cresce automaticamente conforme sua aplicação aumenta |
| **Tempo real** | Sincronização instantânea de dados entre clientes |
| **Autenticação integrada** | Suporte para múltiplos métodos de login |
| **Segurança** | Regras de segurança granulares para proteger dados |
| **Integração com Google Cloud** | Acesso a recursos poderosos da infraestrutura do Google |

### Serviços principais do Firebase

Os dois serviços que abordaremos neste guia são:

1. **Cloud Firestore** - Banco de dados NoSQL em tempo real
2. **Firebase Authentication** - Gerenciamento de usuários e autenticação

---

## Entendendo o Firestore

### O que é Cloud Firestore?

Cloud Firestore é um banco de dados NoSQL em tempo real, hospedado na nuvem do Google, projetado para armazenar e sincronizar dados entre aplicativos cliente e servidor [2]. Diferentemente de um banco de dados relacional tradicional, o Firestore organiza dados em uma estrutura hierárquica de documentos e coleções.

### Estrutura de Dados do Firestore

O Firestore utiliza um modelo de dados baseado em **documentos** e **coleções**:

- **Documentos**: São objetos que contêm dados em pares chave-valor. Cada documento é identificado por um ID único.
- **Coleções**: São contêineres que agrupam documentos. Você pode pensar em uma coleção como uma tabela em um banco de dados relacional.
- **Subcoleções**: Documentos podem conter subcoleções, criando uma estrutura hierárquica.

### Exemplo de estrutura

```
Firestore Database
│
├── users (coleção)
│   ├── user1 (documento)
│   │   ├── email: "user1@example.com"
│   │   ├── name: "João Silva"
│   │   └── links (subcoleção)
│   │       ├── link1 (documento)
│   │       │   ├── title: "Google"
│   │       │   ├── url: "https://google.com"
│   │       │   └── createdAt: timestamp
│   │       └── link2 (documento)
│   │           ├── title: "GitHub"
│   │           ├── url: "https://github.com"
│   │           └── createdAt: timestamp
│   │
│   └── user2 (documento)
│       ├── email: "user2@example.com"
│       └── name: "Maria Santos"
```

### Tipos de dados suportados

O Firestore suporta diversos tipos de dados:

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| **String** | Texto | `"João Silva"` |
| **Number** | Números inteiros e decimais | `42`, `3.14` |
| **Boolean** | Verdadeiro ou falso | `true`, `false` |
| **Date** | Data e hora | `new Date()` |
| **Array** | Lista de valores | `["tag1", "tag2"]` |
| **Map** | Objeto aninhado | `{ nested: { value: 123 } }` |
| **Reference** | Referência a outro documento | `doc(db, "users", "user1")` |
| **Null** | Valor nulo | `null` |

### Vantagens do Firestore

- **Consultas flexíveis**: Você pode filtrar, ordenar e limitar resultados com facilidade
- **Sincronização em tempo real**: Listeners notificam automaticamente quando dados mudam
- **Suporte offline**: Dados são cacheados localmente para funcionamento offline
- **Escalabilidade**: Cresce automaticamente sem necessidade de configuração

---

## Entendendo o Firebase Authentication

### O que é Firebase Authentication?

Firebase Authentication é um serviço que simplifica a autenticação de usuários em suas aplicações [3]. Ele oferece suporte para múltiplos métodos de login, incluindo email/senha, provedores sociais (Google, Facebook, GitHub) e muito mais.

### Fluxo de autenticação

```
┌─────────────────────────────────────────────────────┐
│ Usuário acessa a aplicação                          │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│ Verifica se usuário está autenticado                │
│ (onAuthStateChanged)                                │
└────────────────┬────────────────────────────────────┘
                 │
        ┌────────┴────────┐
        │                 │
        ▼                 ▼
   Autenticado      Não autenticado
        │                 │
        ▼                 ▼
   Mostra app      Mostra tela de login
        │                 │
        │                 ▼
        │         Usuário faz login/registro
        │                 │
        │                 ▼
        │         Firebase valida credenciais
        │                 │
        │        ┌────────┴────────┐
        │        │                 │
        │        ▼                 ▼
        │     Sucesso           Erro
        │        │                 │
        │        ▼                 ▼
        │     Cria sessão    Mostra mensagem
        │        │                 │
        └────────┴─────────────────┘
                 │
                 ▼
        Usuário acessa dados
```

### Métodos de autenticação suportados

Firebase Authentication suporta diversos métodos:

| Método | Descrição |
|--------|-----------|
| **Email/Senha** | Autenticação tradicional com email e senha |
| **Google Sign-In** | Login com conta Google |
| **Facebook Login** | Login com conta Facebook |
| **GitHub** | Login com conta GitHub |
| **Autenticação Anônima** | Acesso sem criar conta |
| **Número de telefone** | Login via SMS |
| **Provedores OpenID Connect** | Integração com provedores customizados |

### Conceitos principais

- **User**: Objeto que representa um usuário autenticado, contendo informações como UID, email, etc.
- **Auth State**: Estado atual de autenticação (autenticado ou não)
- **Session**: Sessão persistente do usuário no navegador
- **JWT Token**: Token de autenticação usado internamente pelo Firebase

---

## Configuração Inicial do Projeto

### Passo 1: Criar um projeto Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto"
3. Digite um nome para seu projeto
4. Siga as instruções na tela

### Passo 2: Registrar sua aplicação web

1. No console do Firebase, clique no ícone de web (`</>`).
2. Digite um nome para seu aplicativo
3. Copie as credenciais fornecidas (você usará isso em breve)

### Passo 3: Criar um projeto Vue.js

```bash
npm create vue@latest link-manager
cd link-manager
npm install
```

Quando solicitado, selecione as seguintes opções:
- TypeScript: No (ou Yes, se preferir)
- Router: Yes
- Pinia: Yes (para gerenciamento de estado)
- Tailwind CSS: Yes

### Passo 4: Instalar Firebase SDK

```bash
npm install firebase
```

### Passo 5: Inicializar Firebase no projeto

Crie um arquivo `src/firebase.js`:

```javascript
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Substitua com suas credenciais do Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Auth e Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
```

### Passo 6: Habilitar Firestore no console

1. No Firebase Console, vá para "Firestore Database"
2. Clique em "Criar banco de dados"
3. Selecione "Modo de teste" (para desenvolvimento)
4. Escolha a região mais próxima

### Passo 7: Habilitar Authentication

1. No Firebase Console, vá para "Authentication"
2. Clique em "Começar"
3. Habilite "Email/Senha" como método de login

---

## Implementando Autenticação

### Criar um serviço de autenticação

Crie um arquivo `src/services/authService.js`:

```javascript
// src/services/authService.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "@/firebase";

/**
 * Registra um novo usuário
 * @param {string} email - Email do usuário
 * @param {string} password - Senha do usuário
 * @returns {Promise} Promessa com dados do usuário
 */
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Faz login de um usuário existente
 * @param {string} email - Email do usuário
 * @param {string} password - Senha do usuário
 * @returns {Promise} Promessa com dados do usuário
 */
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Faz logout do usuário
 * @returns {Promise} Promessa que resolve quando logout é concluído
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Observa mudanças no estado de autenticação
 * @param {Function} callback - Função chamada quando o estado muda
 * @returns {Function} Função para desinscrever do listener
 */
export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * Obtém o usuário atualmente autenticado
 * @returns {Object} Objeto do usuário ou null
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};
```

### Criar um store Pinia para autenticação

Crie um arquivo `src/stores/authStore.js`:

```javascript
// src/stores/authStore.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
  registerUser,
  loginUser,
  logoutUser,
  onAuthStateChangedListener
} from "@/services/authService";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const loading = ref(false);
  const error = ref(null);

  // Computed properties
  const isAuthenticated = computed(() => user.value !== null);

  // Actions
  const register = async (email, password) => {
    loading.value = true;
    error.value = null;
    try {
      const userData = await registerUser(email, password);
      user.value = userData;
      return userData;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const login = async (email, password) => {
    loading.value = true;
    error.value = null;
    try {
      const userData = await loginUser(email, password);
      user.value = userData;
      return userData;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    loading.value = true;
    error.value = null;
    try {
      await logoutUser();
      user.value = null;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const initAuthListener = () => {
    return onAuthStateChangedListener((userData) => {
      user.value = userData;
      loading.value = false;
    });
  };

  return {
    user,
    loading,
    error,
    isAuthenticated,
    register,
    login,
    logout,
    initAuthListener
  };
});
```

---

## Operações CRUD com Firestore

### Criar um serviço para links

Crie um arquivo `src/services/linkService.js`:

```javascript
// src/services/linkService.js
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  onSnapshot
} from "firebase/firestore";
import { db } from "@/firebase";

/**
 * Adiciona um novo link ao Firestore
 * @param {string} userId - ID do usuário
 * @param {Object} linkData - Dados do link
 * @returns {Promise} Promessa com o ID do documento criado
 */
export const addLink = async (userId, linkData) => {
  try {
    const docRef = await addDoc(
      collection(db, "users", userId, "links"),
      {
        ...linkData,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    );
    return docRef.id;
  } catch (error) {
    throw new Error(`Erro ao adicionar link: ${error.message}`);
  }
};

/**
 * Obtém todos os links de um usuário
 * @param {string} userId - ID do usuário
 * @returns {Promise} Promessa com array de links
 */
export const getUserLinks = async (userId) => {
  try {
    const linksRef = collection(db, "users", userId, "links");
    const q = query(linksRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    throw new Error(`Erro ao buscar links: ${error.message}`);
  }
};

/**
 * Observa links em tempo real
 * @param {string} userId - ID do usuário
 * @param {Function} callback - Função chamada quando dados mudam
 * @returns {Function} Função para desinscrever do listener
 */
export const onUserLinksChanged = (userId, callback) => {
  try {
    const linksRef = collection(db, "users", userId, "links");
    const q = query(linksRef, orderBy("createdAt", "desc"));

    return onSnapshot(q, (querySnapshot) => {
      const links = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(links);
    });
  } catch (error) {
    throw new Error(`Erro ao observar links: ${error.message}`);
  }
};

/**
 * Obtém um link específico
 * @param {string} userId - ID do usuário
 * @param {string} linkId - ID do link
 * @returns {Promise} Promessa com dados do link
 */
export const getLink = async (userId, linkId) => {
  try {
    const docRef = doc(db, "users", userId, "links", linkId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      throw new Error("Link não encontrado");
    }
  } catch (error) {
    throw new Error(`Erro ao buscar link: ${error.message}`);
  }
};

/**
 * Atualiza um link existente
 * @param {string} userId - ID do usuário
 * @param {string} linkId - ID do link
 * @param {Object} updateData - Dados a atualizar
 * @returns {Promise} Promessa que resolve quando atualização é concluída
 */
export const updateLink = async (userId, linkId, updateData) => {
  try {
    const docRef = doc(db, "users", userId, "links", linkId);
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: new Date()
    });
  } catch (error) {
    throw new Error(`Erro ao atualizar link: ${error.message}`);
  }
};

/**
 * Deleta um link
 * @param {string} userId - ID do usuário
 * @param {string} linkId - ID do link
 * @returns {Promise} Promessa que resolve quando deleção é concluída
 */
export const deleteLink = async (userId, linkId) => {
  try {
    const docRef = doc(db, "users", userId, "links", linkId);
    await deleteDoc(docRef);
  } catch (error) {
    throw new Error(`Erro ao deletar link: ${error.message}`);
  }
};
```

---

## Integração com Vue.js

### Criar um store Pinia para links

Crie um arquivo `src/stores/linkStore.js`:

```javascript
// src/stores/linkStore.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
  addLink,
  getUserLinks,
  onUserLinksChanged,
  updateLink,
  deleteLink
} from "@/services/linkService";

export const useLinkStore = defineStore("links", () => {
  const links = ref([]);
  const loading = ref(false);
  const error = ref(null);
  let unsubscribe = null;

  // Computed properties
  const linkCount = computed(() => links.value.length);

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

  const clearLinks = () => {
    links.value = [];
    unsubscribeFromLinks();
  };

  return {
    links,
    loading,
    error,
    linkCount,
    createLink,
    fetchLinks,
    subscribeToLinks,
    unsubscribeFromLinks,
    editLink,
    removeLink,
    clearLinks
  };
});
```

### Criar componentes Vue

#### Componente de Login

Crie `src/components/LoginForm.vue`:

```vue
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
```

#### Componente de Dashboard

Crie `src/components/Dashboard.vue`:

```vue
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

      <!-- Mensagem de erro -->
      <div v-if="linkStore.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {{ linkStore.error }}
      </div>

      <!-- Lista de links -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="link in linkStore.links"
          :key="link.id"
          class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
        >
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
      <div v-if="linkStore.links.length === 0" class="text-center py-12">
        <p class="text-gray-500 text-lg">Nenhum link adicionado ainda. Comece adicionando um!</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useLinkStore } from "@/stores/linkStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const linkStore = useLinkStore();
const router = useRouter();

const newLink = ref({
  title: "",
  url: "",
  description: ""
});

const handleAddLink = async () => {
  try {
    await linkStore.createLink(authStore.user.uid, {
      title: newLink.value.title,
      url: newLink.value.url,
      description: newLink.value.description
    });
    newLink.value = { title: "", url: "", description: "" };
  } catch (error) {
    console.error("Erro ao adicionar link:", error);
  }
};

const editLink = (link) => {
  // Implementar edição
  console.log("Editar link:", link);
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

## Estilização com Tailwind CSS

### Configuração do Tailwind

O Tailwind CSS já deve estar configurado se você seguiu as instruções de criação do projeto. Caso contrário, instale:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Configure o arquivo `tailwind.config.js`:

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        secondary: "#8B5CF6"
      }
    }
  },
  plugins: []
}
```

### Boas práticas de estilização

1. **Use classes utilitárias**: Tailwind fornece classes prontas para a maioria das necessidades
2. **Responsive design**: Use prefixos como `md:`, `lg:`, `xl:` para responsividade
3. **Componentes reutilizáveis**: Crie componentes Vue para elementos que se repetem
4. **Consistência**: Use uma paleta de cores consistente em toda a aplicação

---

## Exercícios Práticos

### Exercício 1: Adicionar Categorias aos Links

**Objetivo**: Estender o modelo de dados para incluir categorias.

**Tarefas**:
1. Modifique a estrutura de dados do Firestore para incluir um campo `category`
2. Atualize o formulário de adicionar link para incluir um campo de categoria
3. Implemente filtro de links por categoria no dashboard
4. Adicione cores diferentes para cada categoria

**Dicas**:
- Use um array de categorias pré-definidas
- Considere usar um `select` dropdown no formulário
- Implemente a filtragem no componente Vue usando `computed`

### Exercício 2: Implementar Busca de Links

**Objetivo**: Adicionar funcionalidade de busca em tempo real.

**Tarefas**:
1. Crie um campo de entrada para busca
2. Implemente filtragem de links baseada no título ou descrição
3. Exiba o número de resultados encontrados
4. Permita limpar a busca

**Dicas**:
- Use `computed` para filtragem em tempo real
- Use `.toLowerCase()` para busca case-insensitive
- Considere usar `.includes()` para busca simples

### Exercício 3: Adicionar Funcionalidade de Favoritos

**Objetivo**: Permitir marcar links como favoritos.

**Tarefas**:
1. Adicione um campo `isFavorite` ao modelo de dados
2. Crie um botão para marcar/desmarcar como favorito
3. Implemente um filtro para mostrar apenas favoritos
4. Use um ícone de estrela para indicar favoritos

**Dicas**:
- Use `updateLink` para atualizar o status de favorito
- Use ícones do Font Awesome ou Heroicons
- Considere ordenar favoritos no topo da lista

### Exercício 4: Implementar Edição de Links

**Objetivo**: Completar a funcionalidade de edição de links.

**Tarefas**:
1. Crie um modal ou formulário para editar links
2. Pré-preencha os campos com dados atuais
3. Implemente validação de formulário
4. Mostre mensagem de sucesso após edição

**Dicas**:
- Reutilize o componente de formulário
- Use um `ref` para rastrear qual link está sendo editado
- Considere usar uma biblioteca como `vee-validate` para validação

### Exercício 5: Adicionar Contagem de Cliques

**Objetivo**: Rastrear quantas vezes cada link foi clicado.

**Tarefas**:
1. Adicione um campo `clickCount` ao modelo de dados
2. Incremente o contador quando o link é clicado
3. Exiba o número de cliques no card do link
4. Ordene links por popularidade (mais cliques)

**Dicas**:
- Use `@click` para interceptar cliques
- Atualize o Firestore de forma assíncrona
- Considere usar `setDoc` com `{ merge: true }` para atualização segura

### Exercício 6: Implementar Compartilhamento de Links

**Objetivo**: Permitir compartilhar links com outros usuários.

**Tarefas**:
1. Crie uma estrutura de dados para compartilhamento
2. Implemente um botão "Compartilhar" com email
3. Crie uma página para visualizar links compartilhados
4. Implemente permissões de leitura/escrita

**Dicas**:
- Considere usar uma subcoleção `sharedWith`
- Implemente regras de segurança apropriadas
- Considere usar um sistema de convites

---

## Referências

[1] Firebase Documentation. "Firebase - Google". Disponível em: https://firebase.google.com/docs

[2] Firebase Documentation. "Cloud Firestore". Disponível em: https://firebase.google.com/docs/firestore

[3] Firebase Documentation. "Get Started with Firebase Authentication on Websites". Disponível em: https://firebase.google.com/docs/auth/web/start

[4] Vue.js Documentation. "Vue 3 Guide". Disponível em: https://vuejs.org/guide/

[5] Tailwind CSS Documentation. "Tailwind CSS". Disponível em: https://tailwindcss.com/docs

---
