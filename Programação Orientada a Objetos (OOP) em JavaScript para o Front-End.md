# Guia Prático: Programação Orientada a Objetos (OOP) em JavaScript para o Front-End

A Programação Orientada a Objetos (OOP) é um paradigma de programação fundamental que organiza o código em torno de "objetos" – estruturas de dados que contêm tanto os dados (propriedades) quanto as funções que operam nesses dados (métodos). Este guia explora os conceitos essenciais de OOP em JavaScript, com foco em sua aplicação prática no desenvolvimento front-end.

## 1. Introdução à Programação Orientada a Objetos (OOP)

### Pilares da OOP

A OOP se sustenta em quatro pilares principais que ajudam a criar um código mais organizado, reutilizável e manutenível:

*   **Encapsulamento:** Agrupar dados (propriedades) e os métodos que os manipulam dentro de um único objeto. Isso protege os dados de interferências externas e expõe apenas uma interface controlada para interagir com eles.
*   **Herança:** Permitir que uma nova classe (subclasse) herde propriedades e métodos de uma classe existente (superclasse). Isso promove a reutilização de código e estabelece uma relação hierárquica entre as classes.
*   **Polimorfismo:** A capacidade de objetos de diferentes classes responderem à mesma mensagem (chamada de método) de maneiras específicas. Isso permite escrever um código mais flexível e genérico.
*   **Abstração:** Ocultar a complexidade interna de um objeto e expor apenas as funcionalidades essenciais. Isso simplifica o uso do objeto e reduz o impacto de futuras alterações na implementação.

### Por que usar OOP no Front-end?

No desenvolvimento front-end, a OOP oferece uma maneira estruturada de gerenciar a complexidade das interfaces de usuário (UI). Componentes de UI, como botões, modais ou formulários, podem ser modelados como objetos. Cada componente encapsula seu próprio estado (dados) e comportamento (interações do usuário), tornando o código mais modular, fácil de depurar e reutilizável em diferentes partes da aplicação.

Frameworks modernos como React, Angular e Vue.js, embora possam ter abordagens diferentes, são fortemente influenciados pelos princípios da OOP, especialmente no que diz respeito à componentização.

## 2. Objetos em JavaScript

O objeto é a unidade fundamental da OOP em JavaScript. Um objeto é uma coleção dinâmica de pares chave-valor, onde as chaves são strings (ou Símbolos) e os valores podem ser qualquer tipo de dado, incluindo outros objetos ou funções.

### Criação de Objetos

Existem várias maneiras de criar objetos em JavaScript:

**a) Objeto Literal:** A forma mais comum e simples.

```javascript
const user = {
  name: "Alice",
  email: "alice@example.com",
  login: function() {
    console.log(`${this.name} fez login.`);
  }
};

console.log(user.name); // Saída: Alice
user.login(); // Saída: Alice fez login.
```

**b) Construtor `Object()`:** Usando o construtor nativo `Object`.

```javascript
const product = new Object();
product.name = "Laptop";
product.price = 1200;

console.log(product.price); // Saída: 1200
```

### Propriedades e Métodos

*   **Propriedades:** São os dados armazenados em um objeto (ex: `user.name`).
*   **Métodos:** São as funções associadas a um objeto, que definem seu comportamento (ex: `user.login()`).

## 3. Classes em JavaScript (ES6+)

O ES6 (ECMAScript 2015) introduziu a sintaxe de `class` em JavaScript, que fornece uma maneira mais clara e simples de criar objetos e lidar com herança. É importante notar que as classes em JavaScript oferecem uma sintaxe mais familiar para desenvolvedores de outras linguagens orientadas a objetos.

### Sintaxe de Classes e Construtores

A `class` é um modelo para criar objetos. O método `constructor` é um método especial para criar e inicializar um objeto criado com uma classe.

```javascript
class ButtonComponent {
  constructor(text, color) {
    this.text = text;
    this.color = color;
  }

  // Método de Instância
  render() {
    // Em um cenário real, isso retornaria um elemento HTML
    console.log(`Renderizando um botão com texto "${this.text}" e cor de fundo ${this.color}.`);
    return `<button style="background-color: ${this.color};">${this.text}</button>`;
  }
}

// Criando instâncias (objetos) da classe ButtonComponent
const primaryButton = new ButtonComponent("Confirmar", "blue");
const cancelButton = new ButtonComponent("Cancelar", "grey");

primaryButton.render();
console.log(cancelButton.text); // Saída: Cancelar
```

### Getters e Setters

Getters e setters são métodos especiais que permitem definir o acesso a propriedades de um objeto. Getters são usados para "obter" o valor de uma propriedade, e setters para "definir" o valor.

```javascript
class UserProfile {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // Getter para o nome completo
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  // Setter para o nome completo
  set fullName(newName) {
    const [firstName, lastName] = newName.split(' ');
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

const user = new UserProfile("John", "Doe");
console.log(user.fullName); // Saída: John Doe

user.fullName = "Jane Smith";
console.log(user.firstName); // Saída: Jane
console.log(user.lastName); // Saída: Smith
```

### Métodos e Propriedades Estáticas

Métodos e propriedades estáticas pertencem à própria classe, e não a uma instância da classe. Eles são chamados diretamente na classe.

```javascript
class FormValidator {
  static EMAIL_REGEX = /^\S+@\S+\.\S+$/;

  static isValidEmail(email) {
    return this.EMAIL_REGEX.test(email);
  }
}

console.log(FormValidator.isValidEmail("test@test.com")); // Saída: true
console.log(FormValidator.isValidEmail("invalid-email")); // Saída: false
```

## 4. Herança em JavaScript

A herança permite que uma classe herde características de outra. Em JavaScript, a herança é implementada com as palavras-chave `extends` e `super`.

### `extends` e `super`

A palavra-chave `extends` é usada para criar uma subclasse. O `super` é usado para chamar o construtor da classe pai e para acessar seus métodos.

Vamos criar um componente de `IconButton` que herda de `ButtonComponent`:

```javascript
class IconButton extends ButtonComponent {
  constructor(text, color, icon) {
    // Chama o construtor da classe pai (ButtonComponent)
    super(text, color);
    this.icon = icon;
  }

  // Sobrescrevendo o método render
  render() {
    console.log(`Renderizando um botão de ícone com ícone "${this.icon}".`);
    return `<button style="background-color: ${this.color};"><i class="${this'icon}"></i> ${this.text}</button>`;
  }
}

const deleteButton = new IconButton("Deletar", "red", "trash-icon");
deleteButton.render();
console.log(deleteButton.text); // Saída: Deletar (herdado de ButtonComponent)
```

Neste exemplo, `IconButton` herda `text` e `color` de `ButtonComponent` e adiciona uma nova propriedade, `icon`. O método `render` é sobrescrito para incluir o ícone, demonstrando polimorfismo.



## 5. Exercícios Práticos
Estes exercícios visam consolidar o conhecimento em OOP com JavaScript, aplicando os conceitos em cenários comuns de desenvolvimento front-end.

### Exercício 1: Gerenciador de Tarefas Simples (Objetos e Classes)

**Objetivo:** Criar um sistema simples para gerenciar tarefas, onde cada tarefa é um objeto e o gerenciador de tarefas é uma classe.

**Requisitos:**
1.  Crie uma classe `Task` (Tarefa) que tenha as seguintes propriedades:
    *   `description` (string): Descrição da tarefa.
    *   `isCompleted` (boolean): Indica se a tarefa foi concluída (padrão: `false`).
    *   `id` (string): Um identificador único para a tarefa (pode ser gerado automaticamente, por exemplo, usando `Date.now().toString()`).
2.  A classe `Task` deve ter os seguintes métodos:
    *   `markAsCompleted()`: Altera o status `isCompleted` para `true`.
    *   `editDescription(newDescription)`: Atualiza a descrição da tarefa.
3.  Crie uma classe `TaskManager` (Gerenciador de Tarefas) que gerencie uma coleção de objetos `Task`.
4.  A classe `TaskManager` deve ter as seguintes propriedades:
    *   `tasks` (array): Um array para armazenar instâncias de `Task`.
5.  A classe `TaskManager` deve ter os seguintes métodos:
    *   `addTask(description)`: Cria uma nova `Task` e a adiciona ao array `tasks`.
    *   `removeTask(id)`: Remove uma tarefa pelo seu `id`.
    *   `getTasks()`: Retorna todas as tarefas.
    *   `getCompletedTasks()`: Retorna apenas as tarefas concluídas.
    *   `getPendingTasks()`: Retorna apenas as tarefas pendentes.
    *   `updateTask(id, newDescription, isCompleted)`: Encontra uma tarefa pelo `id` e atualiza sua descrição e/ou status.



### Exercício 2: Componente de Alerta Personalizável (Herança)

**Objetivo:** Criar um sistema de componentes de alerta que podem ser personalizados e estendidos.

**Requisitos:**
1.  Crie uma classe base `AlertComponent` com as seguintes propriedades:
    *   `message` (string): A mensagem do alerta.
    *   `type` (string): O tipo do alerta (ex: 'info', 'success', 'warning', 'error').
    *   `isVisible` (boolean): Indica se o alerta está visível (padrão: `true`).
2.  A classe `AlertComponent` deve ter os seguintes métodos:
    *   `show()`: Define `isVisible` como `true`.
    *   `hide()`: Define `isVisible` como `false`.
    *   `render()`: Retorna uma string HTML representando o alerta. A cor de fundo e a cor do texto devem variar de acordo com o `type`.
        *   `info`: azul claro
        *   `success`: verde claro
        *   `warning`: amarelo claro
        *   `error`: vermelho claro

3.  Crie uma subclasse `DismissibleAlert` que estenda `AlertComponent`.
4.  A classe `DismissibleAlert` deve adicionar:
    *   Um método `dismiss()` que chame `hide()` e também possa simular a remoção do DOM (por exemplo, logando uma mensagem).
    *   O método `render()` deve ser sobrescrito para incluir um botão de "Fechar" (`<button>X</button>`) que, ao ser clicado, chamaria o método `dismiss()` (apenas simule a chamada, não é necessário JS real para o clique).