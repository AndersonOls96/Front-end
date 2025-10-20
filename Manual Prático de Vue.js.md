# Manual Prático de Vue.js: Do Setup ao Mini-Projeto

Este manual prático foi elaborado para fornecer uma experiência de aprendizado **hands-on** com o framework Vue.js. O foco é no código, permitindo que você implemente cada conceito passo a passo, construindo uma aplicação funcional ao longo do processo.

## 1. Início no Framework: Setup, Componentes e "Hello World" Dinâmico

Nesta seção, configuraremos o ambiente de desenvolvimento e criaremos nosso primeiro componente Vue, exibindo uma mensagem dinâmica.

### 1.1. Requisitos e Setup

Para começar, você precisará ter o **Node.js** (versão LTS) e o **npm** (ou yarn/pnpm) instalados em sua máquina.

**Passo 1: Criar o Projeto com Vite**

O Vite é a ferramenta de build recomendada para projetos Vue modernos, oferecendo um desenvolvimento extremamente rápido.

```bash
# 1. Instalar o Vite e criar o projeto
npm create vue@latest

# Responda às perguntas do prompt:
# Project name: meu-manual-vue
# Add TypeScript? No
# Add JSX Support? No
# Add Vue Router? No
# Add Pinia? No
# Add Vitest? No
# Add Cypress? No
# Add ESLint? No

# 2. Navegar para o diretório do projeto
cd meu-manual-vue

# 3. Instalar as dependências
npm install

# 4. Iniciar o servidor de desenvolvimento
npm run dev
```

Seu projeto estará rodando em `http://localhost:5173/` (ou outra porta).

**Estrutura Inicial do Projeto:**

O Vue 3 usa a **Composition API** e o formato de arquivo **Single File Component (SFC)**, que combina `<template>`, `<script>` e `<style>` em um único arquivo `.vue`.

```
meu-manual-vue/
├── src/
│   ├── assets/
│   ├── components/
│   │   └── TheWelcome.vue
│   ├── App.vue          <-- Componente raiz
│   ├── main.js          <-- Ponto de entrada da aplicação
│   └── style.css
├── index.html
└── package.json
```

### 1.2. Componente Básico e Reatividade

Vamos limpar o `App.vue` e criar um novo componente simples.

**`src/App.vue` (Componente Raiz)**

```vue
<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld mensagem="Bem-vindo ao Manual Prático de Vue!" />
    </div>
  </header>
</template>

<style scoped>
/* Estilos básicos para o header */
header {
  line-height: 1.5;
  max-height: 100vh;
}
.wrapper {
  display: flex;
  place-items: flex-start;
  flex-wrap: wrap;
}
</style>
```

**`src/components/HelloWorld.vue` (Nosso Primeiro Componente)**

Este componente irá demonstrar a **reatividade** básica do Vue.

```vue
<script setup>
import { ref } from 'vue'

// Define a propriedade (prop) que este componente pode receber
defineProps({
  mensagem: {
    type: String,
    required: true
  }
})

// Variável reativa para o nosso "Hello World" dinâmico
const saudacao = ref('Hello World!')

// Função para mudar a saudação
function mudarSaudacao() {
  saudacao.value = 'Olá, Vue.js é Incrível!'
}
</script>

<template>
  <div class="greetings">
    <!-- Exibe a variável reativa -->
    <h1 class="green">{{ saudacao }}</h1>
    <!-- Exibe a prop recebida do componente pai -->
    <h3>{{ mensagem }}</h3>
    
    <!-- Botão para demonstrar a reatividade -->
    <button @click="mudarSaudacao">Mudar Saudação</button>
  </div>
</template>

<style scoped>
.greetings h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

.greetings h3 {
  font-size: 1.2rem;
}

.greetings button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
}
</style>
```

**Conceitos Chave:**
*   **`setup` Script:** Onde a lógica do componente é definida. O atributo `setup` no `<script>` permite usar a Composition API de forma concisa.
*   **`ref`:** Usado para criar variáveis **reativas**. Quando o valor de `saudacao.value` muda, o Vue automaticamente atualiza o DOM onde ele é usado.
*   **`defineProps`:** Define as propriedades (props) que o componente pode receber de seu pai.
*   **Interpolação de Texto:** Usamos `{{ saudacao }}` para exibir o valor da variável reativa no template.
*   **Diretiva `@click`:** Abreviação de `v-on:click`, usada para escutar eventos do DOM e chamar métodos.

## 2. Props, Estado e Renderização Condicional: Cadastro Simples

Vamos criar um componente de cadastro simples para explorar como passar dados (Props), gerenciar o estado (`reactive`) e mostrar/esconder elementos (`v-if`).

**`src/components/CadastroSimples.vue`**

```vue
<script setup>
import { reactive, ref } from 'vue'

// 1. Props: Recebendo um título do componente pai
defineProps({
  titulo: {
    type: String,
    default: 'Formulário de Cadastro'
  }
})

// 2. Estado (State): Usando 'reactive' para objetos complexos
const usuario = reactive({
  nome: '',
  email: ''
})

// 3. Estado: Usando 'ref' para um booleano de controle (renderização condicional)
const cadastroConcluido = ref(false)

// 4. Função para simular o cadastro
function cadastrar() {
  // Simula o envio dos dados
  console.log('Dados cadastrados:', usuario)
  
  // Atualiza o estado para mostrar a mensagem de sucesso
  cadastroConcluido.value = true
}
</script>

<template>
  <div class="cadastro-simples">
    <h2>{{ titulo }}</h2>

    <!-- 5. Renderização Condicional (v-if / v-else) -->
    <div v-if="cadastroConcluido" class="sucesso">
      <p>✅ Cadastro de **{{ usuario.nome }}** realizado com sucesso!</p>
      <p>Email: **{{ usuario.email }}**</p>
      <button @click="cadastroConcluido = false">Novo Cadastro</button>
    </div>

    <form v-else @submit.prevent="cadastrar">
      <div class="form-group">
        <label for="nome">Nome:</label>
        <!-- Diretiva v-model: Cria uma ligação bidirecional entre o input e o estado 'usuario.nome' -->
        <input type="text" id="nome" v-model="usuario.nome" required>
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="usuario.email" required>
      </div>

      <button type="submit" :disabled="!usuario.nome || !usuario.email">
        Cadastrar
      </button>
    </form>
  </div>
</template>

<style scoped>
.cadastro-simples {
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.form-group {
  margin-bottom: 1rem;
}
.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}
.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}
button {
  padding: 0.75rem 1.5rem;
  background-color: #42b883; /* Cor do Vue */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}
button:hover:not(:disabled) {
  background-color: #33a06f;
}
button:disabled {
  background-color: #999;
  cursor: not-allowed;
}
.sucesso {
  padding: 1rem;
  background-color: #e6ffe6;
  border: 1px solid #42b883;
  border-radius: 4px;
}
.sucesso p {
    margin-bottom: 1rem;
}
</style>
```

**Atualize `src/App.vue` para usar o novo componente:**

```vue
<script setup>
import HelloWorld from './components/HelloWorld.vue'
import CadastroSimples from './components/CadastroSimples.vue' // Importe
</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld mensagem="Bem-vindo ao Manual Prático de Vue!" />
    </div>
  </header>
  
  <main>
    <!-- Use o componente, passando a prop 'titulo' -->
    <CadastroSimples titulo="Módulo 2: Gerenciamento de Estado" /> 
  </main>
</template>

<!-- ... (style permanece o mesmo) ... -->
```

## 3. Eventos e Formulários no Framework: Formulário Validado

Aprimoraremos nosso formulário introduzindo a **validação reativa** e o uso de **eventos personalizados** (`$emit`) para comunicar o resultado ao componente pai.

### 3.1. Validação Reativa

Usaremos o `computed` para criar uma propriedade que calcula dinamicamente se o formulário é válido, baseando-se no estado.

**`src/components/FormularioValidado.vue`**

```vue
<script setup>
import { reactive, computed } from 'vue'

// Define o evento personalizado que o componente pode emitir
const emit = defineEmits(['cadastro-sucesso'])

const form = reactive({
  nome: '',
  email: '',
  senha: ''
})

// Propriedade computada: Retorna true se o formulário for válido
const isFormValid = computed(() => {
  // Validação: Nome e Email não podem estar vazios, Senha deve ter pelo menos 6 caracteres
  return form.nome.trim() !== '' && 
         form.email.trim() !== '' && 
         form.senha.length >= 6
})

// Propriedade computada: Retorna uma mensagem de erro se a senha for inválida
const senhaError = computed(() => {
  if (form.senha.length > 0 && form.senha.length < 6) {
    return 'A senha deve ter pelo menos 6 caracteres.'
  }
  return ''
})

function handleSubmit() {
  if (isFormValid.value) {
    const dadosUsuario = {
      nome: form.nome,
      email: form.email
      // Não enviamos a senha, apenas os dados públicos
    }
    
    // Emite o evento 'cadastro-sucesso' para o componente pai, passando os dados
    emit('cadastro-sucesso', dadosUsuario)

    // Limpa o formulário
    form.nome = ''
    form.email = ''
    form.senha = ''

  } else {
    console.error('Formulário inválido. Verifique os campos.')
  }
}
</script>

<template>
  <div class="formulario-validado">
    <h3>Formulário com Validação Reativa</h3>
    
    <!-- @submit.prevent impede o comportamento padrão de recarregar a página -->
    <form @submit.prevent="handleSubmit">
      
      <div class="form-group">
        <label for="nome">Nome:</label>
        <input type="text" id="nome" v-model="form.nome" required>
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" required>
      </div>

      <div class="form-group">
        <label for="senha">Senha:</label>
        <input 
          type="password" 
          id="senha" 
          v-model="form.senha" 
          :class="{ 'input-error': senhaError }"
          required
        >
        <!-- Exibe a mensagem de erro da senha condicionalmente -->
        <p v-if="senhaError" class="error-message">{{ senhaError }}</p>
      </div>

      <button type="submit" :disabled="!isFormValid">
        Registrar
      </button>
    </form>
  </div>
</template>

<style scoped>
.formulario-validado {
  margin-top: 2rem;
  padding: 1.5rem;
  border: 1px solid #42b883;
  border-radius: 8px;
  background-color: #f0fff0;
}
.form-group {
  margin-bottom: 1rem;
}
.form-group label {
  display: block;
  margin-bottom: 0.3rem;
  font-weight: bold;
}
.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.input-error {
  border-color: red !important;
}
.error-message {
  color: red;
  font-size: 0.85rem;
  margin-top: 0.25rem;
}
button {
  /* Estilos do botão reutilizados */
  padding: 0.75rem 1.5rem;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}
button:disabled {
  background-color: #999;
  cursor: not-allowed;
}
</style>
```

### 3.2. Usando o Evento no Componente Pai

**Atualize `src/App.vue`:**

```vue
<script setup>
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import FormularioValidado from './components/FormularioValidado.vue' // Importe

const ultimoCadastro = ref(null)

// Função que será chamada quando o evento 'cadastro-sucesso' for emitido
function handleCadastroSucesso(dados) {
  ultimoCadastro.value = dados
  alert(`Usuário ${dados.nome} cadastrado!`)
}
</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld mensagem="Bem-vindo ao Manual Prático de Vue!" />
    </div>
  </header>
  
  <main>
    <!-- Escuta o evento personalizado '@cadastro-sucesso' -->
    <FormularioValidado @cadastro-sucesso="handleCadastroSucesso" />

    <div v-if="ultimoCadastro" style="margin-top: 2rem; padding: 1rem; border: 1px dashed blue;">
        <h4>Último Cadastro Recebido:</h4>
        <p>Nome: {{ ultimoCadastro.nome }}</p>
        <p>Email: {{ ultimoCadastro.email }}</p>
    </div>
  </main>
</template>

<!-- ... (style permanece o mesmo) ... -->
```

**Conceitos Chave:**
*   **`defineEmits`:** Define os eventos que o componente pode emitir.
*   **`emit('nome-do-evento', payload)`:** Envia um evento para o componente pai, que pode escutá-lo usando `@nome-do-evento`.
*   **`computed`:** Cria um valor que é **cacheado** e só é recalculado quando suas dependências reativas mudam. Ideal para lógica de validação.
*   **`@submit.prevent`:** Modificador de evento que impede o comportamento padrão do formulário (recarregar a página).
*   **Binding de Classe (`:class`):** Usado para aplicar a classe `input-error` condicionalmente, dependendo do valor de `senhaError`.

## 4. Estilização de Componentes: Tela Estilizada

O Vue SFC permite que você defina estilos com o atributo `scoped`, garantindo que o CSS afete apenas o componente atual. Para estilos globais, usamos o `style.css` ou um bloco `<style>` sem `scoped`.

### 4.1. CSS Scoped e Estilização Avançada

Vamos criar um componente de **Card** estilizado para demonstrar a modularidade do CSS.

**`src/components/CardEstilizado.vue`**

```vue
<script setup>
defineProps({
  titulo: String,
  subtitulo: String
})
</script>

<template>
  <div class="card">
    <div class="card-header">
      <h4 class="card-title">{{ titulo }}</h4>
      <p class="card-subtitle">{{ subtitulo }}</p>
    </div>
    <div class="card-body">
      <!-- Slot: Conteúdo a ser injetado pelo componente pai -->
      <slot></slot>
    </div>
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped>
/* O atributo 'scoped' garante que estes estilos só se aplicam a este componente */
.card {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin: 1rem;
  max-width: 350px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #f7f7f7;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e0e0e0;
}

.card-title {
  font-size: 1.5rem;
  color: #333;
  margin: 0;
}

.card-subtitle {
  font-size: 0.9rem;
  color: #777;
  margin: 0.25rem 0 0 0;
}

.card-body {
  padding: 1.5rem;
  color: #555;
  line-height: 1.6;
}

.card-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e0e0e0;
  background-color: #fafafa;
  text-align: right;
}
</style>
```

### 4.2. Usando o Card Estilizado

**Atualize `src/App.vue`:**

```vue
<script setup>
// ... (imports anteriores) ...
import CardEstilizado from './components/CardEstilizado.vue' // Importe
</script>

<template>
  <!-- ... (header e main anteriores) ... -->
  
  <main>
    <div style="display: flex; justify-content: center; flex-wrap: wrap;">
      
      <!-- Card 1: Exemplo de uso de Slot Padrão -->
      <CardEstilizado 
        titulo="Módulo 4: Estilização" 
        subtitulo="Componente com CSS Scoped"
      >
        <p>Este é o corpo do card. O conteúdo é injetado através do **slot padrão** do componente pai.</p>
        <p>A estilização está encapsulada graças ao atributo `scoped`.</p>
        
        <!-- Slot Nomeado -->
        <template #footer>
          <button style="background: #007bff; color: white; padding: 0.5rem 1rem; border: none; border-radius: 4px;">Detalhes</button>
        </template>
      </CardEstilizado>

      <!-- Card 2: Reutilização -->
      <CardEstilizado 
        titulo="Reutilização Fácil" 
        subtitulo="O poder dos componentes"
      >
        <p>Podemos usar o mesmo componente em vários lugares com dados e conteúdos diferentes.</p>
        <template #footer>
          <small>Última atualização: Hoje</small>
        </template>
      </CardEstilizado>
    </div>
  </main>
</template>

<!-- ... (style permanece o mesmo) ... -->
```

**Nota sobre CSS-in-JS e Tailwind:**
*   **Tailwind CSS:** Para usar o Tailwind, você instalaria o pacote e o configuraria no seu projeto Vite. Em vez de blocos `<style>`, você aplicaria classes utilitárias diretamente no `<template>` (ex: `<div class="bg-blue-500 p-4 rounded">`).
*   **CSS-in-JS (ex: Styled Components, Emotion):** Embora menos comuns no ecossistema Vue, bibliotecas como `vue-styled-components` permitem escrever CSS dentro do bloco `<script>` usando JavaScript, o que oferece maior dinamismo e evita conflitos globais de nomes.

## 5. Listas, Loops e Formulários Controlados: Lista Dinâmica

O Vue usa a diretiva **`v-for`** para renderizar uma lista de elementos baseada em um array de dados.

### 5.1. Renderizando uma Lista com `v-for`

Vamos criar um componente que exibe uma lista de tarefas e permite adicionar novas.

**`src/components/ListaDinamica.vue`**

```vue
<script setup>
import { reactive, ref } from 'vue'

// Array reativo para armazenar a lista de tarefas
const tarefas = reactive([
  { id: 1, texto: 'Configurar o projeto Vue', concluida: true },
  { id: 2, texto: 'Estudar Props e Estado', concluida: false },
  { id: 3, texto: 'Implementar o Formulário Validado', concluida: false }
])

// Variável reativa para o input do formulário (Formulário Controlado)
const novaTarefaTexto = ref('')
let nextId = 4

function adicionarTarefa() {
  if (novaTarefaTexto.value.trim() === '') {
    return // Não adiciona tarefas vazias
  }
  
  // Adiciona a nova tarefa ao array reativo
  tarefas.push({
    id: nextId++,
    texto: novaTarefaTexto.value.trim(),
    concluida: false
  })
  
  // Limpa o input
  novaTarefaTexto.value = ''
}

function removerTarefa(id) {
  // Encontra o índice da tarefa
  const index = tarefas.findIndex(t => t.id === id)
  if (index !== -1) {
    // Remove a tarefa do array
    tarefas.splice(index, 1)
  }
}
</script>

<template>
  <div class="lista-dinamica">
    <h3>Minha Lista de Tarefas (v-for)</h3>

    <!-- Formulário Controlado para Adicionar Tarefa -->
    <form @submit.prevent="adicionarTarefa" class="add-form">
      <input 
        type="text" 
        placeholder="Nova tarefa..." 
        v-model="novaTarefaTexto"
      >
      <button type="submit">Adicionar</button>
    </form>

    <!-- Lista de Tarefas -->
    <ul>
      <!-- v-for: Itera sobre o array 'tarefas' -->
      <!-- :key é OBRIGATÓRIO e deve ser um valor único (id) para otimização do Vue -->
      <li 
        v-for="tarefa in tarefas" 
        :key="tarefa.id" 
        :class="{ 'concluida': tarefa.concluida }"
        class="tarefa-item"
      >
        <!-- @click: Alterna o estado de 'concluida' -->
        <span @click="tarefa.concluida = !tarefa.concluida">
          {{ tarefa.texto }}
        </span>
        
        <button @click="removerTarefa(tarefa.id)" class="remover-btn">
          &times;
        </button>
      </li>
    </ul>

    <!-- Renderização Condicional: Exibe mensagem se a lista estiver vazia -->
    <p v-if="tarefas.length === 0" class="lista-vazia">
      🎉 Nenhuma tarefa pendente!
    </p>
  </div>
</template>

<style scoped>
.lista-dinamica {
  margin-top: 2rem;
  padding: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}
.add-form {
  display: flex;
  margin-bottom: 1rem;
}
.add-form input {
  flex-grow: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
}
.add-form button {
  padding: 0.5rem 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}
ul {
  list-style: none;
  padding: 0;
}
.tarefa-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}
.tarefa-item:last-child {
  border-bottom: none;
}
.tarefa-item span {
    flex-grow: 1;
}
.tarefa-item.concluida span {
  text-decoration: line-through;
  color: #999;
}
.remover-btn {
  background: none;
  border: none;
  color: red;
  font-size: 1.2rem;
  cursor: pointer;
  margin-left: 1rem;
}
.lista-vazia {
    text-align: center;
    color: #777;
    margin-top: 1rem;
}
</style>
```

**Atualize `src/App.vue`:**

```vue
<script setup>
// ... (imports anteriores) ...
import ListaDinamica from './components/ListaDinamica.vue' // Importe
</script>

<template>
  <!-- ... (header e main anteriores) ... -->
  
  <main>
    <!-- ... (Cards Estilizados) ... -->
    
    <ListaDinamica />
  </main>
</template>

<!-- ... (style permanece o mesmo) ... -->
```

## 6. Componentização e Reutilização: Biblioteca de Componentes

O Vue promove a arquitetura baseada em componentes. Uma **biblioteca de componentes** é simplesmente um conjunto de componentes genéricos (como o `CardEstilizado` que criamos) que podem ser usados em qualquer parte da aplicação.

### 6.1. Criando um Componente de Botão Reutilizável

Um botão é o exemplo clássico de componente reutilizável. Ele deve aceitar diferentes estilos (Props) e emitir um evento (Emits) quando clicado.

**`src/components/BotaoReutilizavel.vue`**

```vue
<script setup>
import { computed } from 'vue'

const props = defineProps({
  // Propriedade para o texto do botão
  label: {
    type: String,
    required: true
  },
  // Propriedade para definir o estilo (primario, secundario, perigo)
  tipo: {
    type: String,
    default: 'primario',
    validator: (value) => ['primario', 'secundario', 'perigo'].includes(value)
  },
  // Propriedade para desabilitar o botão
  desabilitado: {
    type: Boolean,
    default: false
  }
})

// Define o evento que o componente pode emitir
const emit = defineEmits(['clique'])

// Propriedade computada para definir as classes CSS dinamicamente
const buttonClass = computed(() => {
  return {
    'btn-primario': props.tipo === 'primario',
    'btn-secundario': props.tipo === 'secundario',
    'btn-perigo': props.tipo === 'perigo',
    'btn-disabled': props.desabilitado
  }
})

function handleClick() {
  if (!props.desabilitado) {
    // Emite o evento 'clique' para o componente pai
    emit('clique')
  }
}
</script>

<template>
  <button 
    :class="buttonClass" 
    :disabled="desabilitado" 
    @click="handleClick"
  >
    {{ label }}
  </button>
</template>

<style scoped>
button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease, opacity 0.3s ease;
  margin: 0.5rem;
}

/* Estilo Primário (Verde Vue) */
.btn-primario {
  background-color: #42b883;
  color: white;
}
.btn-primario:hover:not(:disabled) {
  background-color: #33a06f;
}

/* Estilo Secundário (Azul) */
.btn-secundario {
  background-color: #3498db;
  color: white;
}
.btn-secundario:hover:not(:disabled) {
  background-color: #2980b9;
}

/* Estilo Perigo (Vermelho) */
.btn-perigo {
  background-color: #e74c3c;
  color: white;
}
.btn-perigo:hover:not(:disabled) {
  background-color: #c0392b;
}

/* Estilo Desabilitado */
.btn-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
```

### 6.2. Usando o Botão Reutilizável

**Atualize `src/App.vue`:**

```vue
<script setup>
// ... (imports anteriores) ...
import BotaoReutilizavel from './components/BotaoReutilizavel.vue' // Importe
</script>

<template>
  <!-- ... (header e main anteriores) ... -->
  
  <main>
    <!-- ... (Cards Estilizados e Lista Dinâmica) ... -->
    
    <div style="margin-top: 3rem; text-align: center;">
      <h3>Módulo 6: Biblioteca de Componentes</h3>
      
      <BotaoReutilizavel 
        label="Botão Primário" 
        tipo="primario" 
        @clique="alert('Ação Primária!')"
      />
      
      <BotaoReutilizavel 
        label="Botão Secundário" 
        tipo="secundario" 
        @clique="alert('Ação Secundária!')"
      />
      
      <BotaoReutilizavel 
        label="Botão de Perigo" 
        tipo="perigo" 
        @clique="alert('Atenção: Perigo!')"
      />
      
      <BotaoReutilizavel 
        label="Desabilitado" 
        tipo="primario" 
        :desabilitado="true"
      />
    </div>
  </main>
</template>

<!-- ... (style permanece o mesmo) ... -->
```

## 7. Mini-Projeto 1: SPA Simples (Gerenciador de Tarefas)

Vamos consolidar todos os conceitos aprendidos (Componentes, Props, Estado, Eventos, `v-if`, `v-for`) em um mini-projeto.

### 7.1. Estrutura do Mini-Projeto

Vamos refatorar o `App.vue` para ser o container principal e usar o `ListaDinamica.vue` como nosso componente de página.

**`src/App.vue` (Container Principal)**

O `App.vue` será simplificado para apenas estruturar a aplicação.

```vue
<script setup>
import ListaDinamica from './components/ListaDinamica.vue'
</script>

<template>
  <div id="app-container">
    <header class="app-header">
      <h1>Vue Task Manager</h1>
      <p>Um SPA simples construído com os conceitos do manual.</p>
    </header>
    
    <main class="app-main">
      <ListaDinamica />
    </main>
  </div>
</template>

<style>
/* Estilos globais (sem 'scoped') para a aplicação inteira */
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f9;
  margin: 0;
  padding: 0;
}
#app-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.app-header {
  text-align: center;
  padding: 20px 0;
  border-bottom: 3px solid #42b883;
  margin-bottom: 20px;
}
.app-header h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}
.app-header p {
  color: #777;
}
.app-main {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}
</style>
```

### 7.2. Refatorando `ListaDinamica.vue`

O componente `ListaDinamica.vue` (criado na Seção 5) já é o nosso mini-projeto de gerenciador de tarefas. Ele contém:
*   **Estado Reativo:** O array `tarefas`.
*   **Formulário Controlado:** O input `novaTarefaTexto` e a função `adicionarTarefa`.
*   **Loop (`v-for`):** Para renderizar a lista de tarefas.
*   **Renderização Condicional (`v-if`):** Para mostrar a mensagem de lista vazia.
*   **Eventos:** O `@click` para alternar o estado de conclusão e para remover a tarefa.

Ao rodar a aplicação com o novo `App.vue` e o `ListaDinamica.vue` da Seção 5, você terá um **SPA Simples** funcional: um aplicativo de página única que gerencia o estado das tarefas sem recarregar a página, demonstrando o poder do Vue.js.

### 7.3. Desafio Adicional: Filtros

Para aprimorar o mini-projeto, adicione um filtro para exibir apenas tarefas pendentes ou apenas concluídas.

**Modificações em `src/components/ListaDinamica.vue`:**

1.  **Adicione um estado para o filtro:**
    ```javascript
    const filtro = ref('todos') // 'todos', 'pendentes', 'concluidas'
    ```

2.  **Crie uma propriedade computada para a lista filtrada:**
    ```javascript
    const tarefasFiltradas = computed(() => {
      if (filtro.value === 'pendentes') {
        return tarefas.filter(t => !t.concluida)
      }
      if (filtro.value === 'concluidas') {
        return tarefas.filter(t => t.concluida)
      }
      return tarefas // 'todos'
    })
    ```

3.  **Use a propriedade computada no `v-for` e adicione os botões de filtro no template:**

    ```vue
    <template>
      <div class="lista-dinamica">
        <!-- ... (Formulário Adicionar) ... -->

        <div class="filtros">
          <button @click="filtro = 'todos'" :class="{ active: filtro === 'todos' }">Todos</button>
          <button @click="filtro = 'pendentes'" :class="{ active: filtro === 'pendentes' }">Pendentes</button>
          <button @click="filtro = 'concluidas'" :class="{ active: filtro === 'concluidas' }">Concluídas</button>
        </div>

        <ul>
          <!-- Use tarefasFiltradas no v-for -->
          <li 
            v-for="tarefa in tarefasFiltradas" 
            :key="tarefa.id" 
            :class="{ 'concluida': tarefa.concluida }"
            class="tarefa-item"
          >
            <!-- ... (Conteúdo da tarefa) ... -->
          </li>
        </ul>
        
        <!-- ... (Mensagem de lista vazia) ... -->
      </div>
    </template>
    
    <style scoped>
    /* ... (Estilos anteriores) ... */
    .filtros {
      text-align: center;
      margin-bottom: 1rem;
    }
    .filtros button {
      background: #eee;
      color: #333;
      border: 1px solid #ccc;
      padding: 0.5rem 1rem;
      margin: 0 0.25rem;
      border-radius: 4px;
      cursor: pointer;
    }
    .filtros button.active {
      background-color: #42b883;
      color: white;
      border-color: #42b883;
    }
    </style>
    ```

Com este desafio, você consolidou o uso de **`ref`**, **`reactive`**, **`computed`**, **`v-for`**, **`v-if`**, e **eventos** para construir uma aplicação Vue.js completa e interativa.
