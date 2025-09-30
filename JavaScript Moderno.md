## Parte 1: Variáveis, Funções e ES6

Nesta primeira seção, exploraremos os blocos de construção de qualquer aplicação JavaScript: como declaramos e utilizamos variáveis, a evolução das funções e as principais inovações trazidas pelo ES6.

### 1.1 Variáveis: `var`, `let` e `const`

Em JavaScript, a forma como declaramos variáveis evoluiu significativamente. Entender a diferença entre `var`, `let` e `const` é crucial para escrever um código limpo e sem bugs.

| Palavra-chave | Escopo         | Hoisting          | Reatribuição | Redeclaração |
|---------------|----------------|-------------------|--------------|--------------|
| `var`         | Função         | Sim (inicializada com `undefined`) | Sim          | Sim          |
| `let`         | Bloco (`{}`)   | Sim (não inicializada) | Sim          | Não          |
| `const`       | Bloco (`{}`)   | Sim (não inicializada) | Não          | Não          |

> **Hoisting** é o comportamento do JavaScript de mover as declarações para o topo do escopo atual. Com `var`, a variável é inicializada com `undefined`, enquanto com `let` e `const`, a variável fica em uma "zona morta temporal" (Temporal Dead Zone) até sua declaração ser alcançada, resultando em um `ReferenceError` se acessada antes.

**Exemplo Prático:**

```javascript
function exampleVar() {
  console.log(a); // undefined
  var a = 10;
  console.log(a); // 10
}

function exampleLet() {
  // console.log(b); // ReferenceError: Cannot access 'b' before initialization
  let b = 20;
  console.log(b); // 20
}

const c = 30;
// c = 40; // TypeError: Assignment to constant variable.
```

### 1.2 Funções: Declarações, Expressões e Arrow Functions

As funções são fundamentais em JavaScript. Com o ES6, as *arrow functions* foram introduzidas, oferecendo uma sintaxe mais concisa e uma gestão diferente do `this`.

**Declaração de Função:**
```javascript
function soma(a, b) {
  return a + b;
}
```

**Expressão de Função:**
```javascript
const subtracao = function(a, b) {
  return a - b;
};
```

**Arrow Function (ES6):**
```javascript
const multiplicacao = (a, b) => a * b;

// Arrow functions com corpo
const divisao = (a, b) => {
  if (b === 0) {
    return 'Não é possível dividir por zero';
  }
  return a / b;
};
```

A principal diferença funcional das *arrow functions* é que elas não possuem seu próprio `this`. Em vez disso, elas herdam o `this` do escopo pai, o que resolve muitos problemas comuns encontrados em callbacks e manipulação de eventos.

### 1.3 Inovações do ES6

O ECMAScript 2015 (ES6) foi uma das atualizações mais importantes para o JavaScript. Além de `let`, `const` e *arrow functions*, outras funcionalidades se destacam:

- **Template Literals:** Permitem a interpolação de variáveis e a criação de strings multi-linha de forma mais simples.
  ```javascript
  const nome = 'Mundo';
  console.log(`Olá, ${nome}!`);
  ```

- **Destructuring (Desestruturação):** Uma forma fácil de extrair valores de arrays ou propriedades de objetos em variáveis distintas.
  ```javascript
  const pessoa = { nome: 'Ana', idade: 25 };
  const { nome, idade } = pessoa;
  console.log(nome); // Ana

  const numeros = [1, 2, 3];
  const [primeiro, segundo] = numeros;
  console.log(primeiro); // 1
  ```

- **Default Parameters (Parâmetros Padrão):** Permitem que parâmetros de funções sejam inicializados com valores padrão caso nenhum valor ou `undefined` seja passado.
  ```javascript
  function saudar(nome = 'Visitante') {
    console.log(`Olá, ${nome}!`);
  }
  saudar(); // Olá, Visitante!
  ```

- **Rest & Spread Operators (`...`):** O operador *rest* agrupa o "resto" dos elementos em um array (em parâmetros de função) ou objeto. O operador *spread* "espalha" os elementos de um iterável (como um array) ou as propriedades de um objeto.
  ```javascript
  // Rest
  function somarTudo(...numeros) {
    return numeros.reduce((acc, atual) => acc + atual, 0);
  }
  console.log(somarTudo(1, 2, 3, 4)); // 10

  // Spread
  const arr1 = [1, 2];
  const arr2 = [...arr1, 3, 4];
  console.log(arr2); // [1, 2, 3, 4]
  ```


## Parte 2: Estruturas de Controle, Arrays e Objetos

Nesta segunda parte, exploraremos como controlar o fluxo de execução do seu código com estruturas condicionais e de repetição, e como trabalhar com as estruturas de dados mais fundamentais do JavaScript: arrays e objetos.

### 2.1 Estruturas de Controle

As estruturas de controle permitem que você tome decisões e execute blocos de código repetidamente, tornando seus programas dinâmicos e interativos.

#### 2.1.1 Condicionais: `if`, `else if`, `else`, `switch`

-   **`if`, `else if`, `else`**: Executam blocos de código com base em condições booleanas.

    ```javascript
    const idade = 18;

    if (idade >= 18) {
      console.log("Maior de idade");
    } else if (idade >= 12) {
      console.log("Adolescente");
    } else {
      console.log("Criança");
    }
    ```

-   **`switch`**: Uma alternativa para múltiplas condições `if...else if` quando se compara uma única expressão com vários valores possíveis.

    ```javascript
    const diaSemana = 3;
    let nomeDia;

    switch (diaSemana) {
      case 1:
        nomeDia = "Domingo";
        break;
      case 2:
        nomeDia = "Segunda-feira";
        break;
      case 3:
        nomeDia = "Terça-feira";
        break;
      default:
        nomeDia = "Dia inválido";
    }
    console.log(nomeDia); // Terça-feira
    ```

#### 2.1.2 Laços de Repetição: `for`, `while`, `do...while`, `for...of`, `for...in`

-   **`for`**: Ideal para quando o número de iterações é conhecido.

    ```javascript
    for (let i = 0; i < 5; i++) {
      console.log(i); // 0, 1, 2, 3, 4
    }
    ```

-   **`while`**: Repete um bloco de código enquanto uma condição for verdadeira.

    ```javascript
    let contador = 0;
    while (contador < 3) {
      console.log(contador);
      contador++;
    } // 0, 1, 2
    ```

-   **`do...while`**: Similar ao `while`, mas garante que o bloco de código seja executado pelo menos uma vez.

    ```javascript
    let i = 0;
    do {
      console.log(i);
      i++;
    } while (i < 0); // 0 (executa uma vez, mesmo com a condição falsa)
    ```

-   **`for...of` (ES6)**: Itera sobre valores de objetos iteráveis (como Arrays, Strings, Maps, Sets).

    ```javascript
    const frutas = ["maçã", "banana", "laranja"];
    for (const fruta of frutas) {
      console.log(fruta);
    }
    // maçã, banana, laranja
    ```

-   **`for...in`**: Itera sobre as chaves (propriedades) enumeráveis de um objeto.

    ```javascript
    const carro = { marca: "Ford", modelo: "Ka", ano: 2020 };
    for (const chave in carro) {
      console.log(`${chave}: ${carro[chave]}`);
    }
    // marca: Ford, modelo: Ka, ano: 2020
    ```

### 2.2 Arrays

Arrays são listas ordenadas de valores. São uma das estruturas de dados mais usadas em JavaScript.

**Criação e Acesso:**

```javascript
const numeros = [1, 2, 3, 4, 5];
console.log(numeros[0]); // 1 (índice começa em 0)
console.log(numeros.length); // 5
```

**Métodos Comuns de Array (ES6+):**

| Método      | Descrição                                                              | Exemplo                                                              |
|-------------|------------------------------------------------------------------------|----------------------------------------------------------------------|
| `push()`    | Adiciona um ou mais elementos ao final do array e retorna o novo comprimento. | `[1, 2].push(3)` -> `[1, 2, 3]`                                      |
| `pop()`     | Remove o último elemento de um array e o retorna.                     | `[1, 2, 3].pop()` -> `3`, array se torna `[1, 2]`                    |
| `unshift()` | Adiciona um ou mais elementos ao início do array e retorna o novo comprimento. | `[1, 2].unshift(0)` -> `[0, 1, 2]`                                   |
| `shift()`   | Remove o primeiro elemento de um array e o retorna.                    | `[0, 1, 2].shift()` -> `0`, array se torna `[1, 2]`                  |
| `map()`     | Cria um novo array com os resultados da chamada de uma função para cada elemento do array. | `[1, 2].map(x => x * 2)` -> `[2, 4]`                                 |
| `filter()`  | Cria um novo array com todos os elementos que passam no teste implementado pela função fornecida. | `[1, 2, 3].filter(x => x > 1)` -> `[2, 3]`                           |
| `reduce()`  | Executa uma função *reducer* (fornecida por você) em cada elemento do array, resultando em um único valor de saída. | `[1, 2, 3].reduce((acc, val) => acc + val, 0)` -> `6`                |
| `forEach()` | Executa uma função fornecida uma vez para cada elemento do array.     | `[1, 2].forEach(x => console.log(x))` -> `1\n2`                      |
| `find()`    | Retorna o valor do **primeiro** elemento no array que satisfaz a função de teste fornecida. | `[1, 2, 3].find(x => x > 1)` -> `2`                                  |
| `findIndex()` | Retorna o **índice** do primeiro elemento no array que satisfaz a função de teste fornecida. | `[1, 2, 3].findIndex(x => x > 1)` -> `1`                             |
| `includes()` | Determina se um array contém um determinado elemento, retornando `true` ou `false`. | `[1, 2].includes(2)` -> `true`                                       |

### 2.3 Objetos

Objetos são coleções de pares chave-valor e são a estrutura de dados mais fundamental para representar entidades complexas em JavaScript.

**Criação e Acesso:**

```javascript
const pessoa = {
  nome: "Maria",
  idade: 30,
  profissao: "Engenheira"
};

console.log(pessoa.nome); // Maria
console.log(pessoa["idade"]); // 30

pessoa.cidade = "São Paulo"; // Adicionar nova propriedade
delete pessoa.profissao; // Remover propriedade
```

**Métodos Comuns de Objeto (ES6+):**

-   **`Object.keys()`**: Retorna um array com as chaves (nomes das propriedades) enumeráveis de um objeto.

    ```javascript
    console.log(Object.keys(pessoa)); // ["nome", "idade", "cidade"]
    ```

-   **`Object.values()`**: Retorna um array com os valores das propriedades enumeráveis de um objeto.

    ```javascript
    console.log(Object.values(pessoa)); // ["Maria", 30, "São Paulo"]
    ```

-   **`Object.entries()`**: Retorna um array de arrays `[chave, valor]` para cada par propriedade-valor enumerável de um objeto.

    ```javascript
    console.log(Object.entries(pessoa));
    // [["nome", "Maria"], ["idade", 30], ["cidade", "São Paulo"]]
    ```

-   **`Object.assign()`**: Copia todas as propriedades enumeráveis próprias de um ou mais objetos de origem para um objeto de destino. Retorna o objeto de destino.

    ```javascript
    const obj1 = { a: 1 };
    const obj2 = { b: 2 };
    const objCombinado = Object.assign({}, obj1, obj2);
    console.log(objCombinado); // { a: 1, b: 2 }
    ```

-   **Spread Operator (`...`) com Objetos (ES9/ES2018)**: Permite copiar propriedades de um objeto para outro de forma concisa.

    ```javascript
    const carroBase = { marca: "Toyota", cor: "prata" };
    const carroCompleto = { ...carroBase, modelo: "Corolla", ano: 2023 };
    console.log(carroCompleto);
    // { marca: "Toyota", cor: "prata", modelo: "Corolla", ano: 2023 }
    ```



### 2.4 Exercícios Práticos: Estruturas de Controle, Arrays e Objetos

Resolva os seguintes exercícios para aprimorar suas habilidades:

1.  **Condicionais:** Crie um programa que receba um número e determine se ele é positivo, negativo ou zero.

    ```javascript
    // Seu código aqui
    ```

2.  **Laços de Repetição:** Escreva um loop `for` que imprima os números de 1 a 10. Em seguida, use um loop `while` para fazer o mesmo.

    ```javascript
    // Seu código aqui
    ```

3.  **Arrays - Manipulação:** Dado o array `frutas = ["maçã", "banana", "laranja", "uva"]`:
    a. Adicione "abacaxi" ao final do array.
    b. Remova "banana" do array.
    c. Encontre o índice de "laranja".
    d. Crie um novo array contendo apenas as frutas que começam com a letra 'a'.

    ```javascript
    // Seu código aqui
    ```

4.  **Arrays - Métodos de Alta Ordem:** Dado o array de números `const precos = [10.50, 20.00, 15.75, 30.25]`:
    a. Use `map` para criar um novo array com os preços com 10% de desconto.
    b. Use `filter` para criar um novo array com os preços maiores que 18.00.
    c. Use `reduce` para calcular a soma total dos preços.

    ```javascript
    // Seu código aqui
    ```

5.  **Objetos:** Crie um objeto `livro` com as propriedades `titulo`, `autor` e `anoPublicacao`. Em seguida:
    a. Acesse e imprima o `titulo` e o `autor`.
    b. Adicione uma nova propriedade `genero` ao objeto.
    c. Use `Object.keys()` para listar todas as chaves do objeto.
    d. Use `Object.values()` para listar todos os valores do objeto.

    ```javascript
    // Seu código aqui
    ```

6.  **Objetos e Desestruturação:** Dado o objeto `produto = { nome: "Notebook", preco: 2500, detalhes: { cor: "prata", marca: "XYZ" } }`:
    a. Use desestruturação para extrair `nome` e `preco`.
    b. Use desestruturação aninhada para extrair `cor` dos `detalhes`.

    ```javascript
    // Seu código aqui
    ```



---

## Conclusão

Este guia prático abordou os fundamentos do JavaScript moderno, desde a gestão de variáveis e a evolução das funções com o ES6, até as estruturas de controle de fluxo e o uso eficiente de arrays e objetos. A prática constante é a chave para dominar esses conceitos e construir aplicações robustas e eficientes. Continue explorando a documentação oficial e experimentando com novos projetos para aprofundar seu conhecimento.