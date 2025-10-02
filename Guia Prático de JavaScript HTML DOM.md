# Guia Prático de JavaScript HTML DOM

## 1. Introdução ao HTML DOM

O **Document Object Model (DOM)** é uma interface de programação para documentos HTML e XML. Ele representa a página de forma que programas possam mudar a estrutura, estilo e conteúdo do documento. O DOM representa o documento como uma árvore de nodos, onde cada nodo representa uma parte do documento (um elemento, um atributo, um texto, etc.).

### 1.1 O que é o DOM?

O DOM é uma representação em memória do seu documento HTML. Quando um navegador carrega uma página HTML, ele cria uma representação em árvore dessa página, onde cada elemento HTML, atributo e pedaço de texto se torna um **nodo** na árvore. O JavaScript pode então interagir com essa árvore para acessar e manipular o conteúdo da página.

### 1.2 Árvore DOM

A árvore DOM é uma estrutura hierárquica. O `document` é o nodo raiz, e todos os outros elementos são seus descendentes. Por exemplo, um elemento `<html>` é filho do `document`, um `<head>` e um `<body>` são filhos do `<html>`, e assim por diante.

### 1.3 Nodos (Elementos, Atributos, Texto)

Existem diferentes tipos de nodos na árvore DOM:

*   **Nodos de Elemento:** Representam tags HTML como `<div>`, `<p>`, `<h1>`, etc.
*   **Nodos de Atributo:** Representam os atributos de elementos HTML, como `id`, `class`, `src`, `href`.
*   **Nodos de Texto:** Representam o texto contido dentro de elementos HTML.

## 2. Acessando Elementos HTML

Para manipular o DOM, primeiro precisamos selecionar os elementos HTML. O JavaScript oferece vários métodos para isso:

| Método | Descrição |
|---|---|
| `document.getElementById()` | Retorna um único elemento pelo seu `id`. |
| `document.getElementsByClassName()` | Retorna uma **HTMLCollection** (similar a um array) de todos os elementos que possuem a classe especificada. Os elementos são retornados na ordem em que aparecem no documento. |
| `document.getElementsByTagName()` | Retorna uma **HTMLCollection** de todos os elementos com o nome da tag especificado. |
| `document.querySelector()` | Retorna o **primeiro elemento** do documento que corresponde ao seletor CSS especificado. É um método muito versátil, pois aceita qualquer seletor CSS válido. |
| `document.querySelectorAll()` | Retorna uma **NodeList** (similar a um array) de todos os elementos do documento que correspondem ao seletor CSS especificado. |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  to obter um único elemento pelo seu `id`.

**Exemplo:**

```html
<p id="mensagem">Olá, mundo!</p>
<script>
    const paragrafo = document.getElementById('mensagem');
    console.log(paragrafo.textContent); // Saída: Olá, mundo!
</script>
```

### 2.2 `document.getElementsByClassName()`

Retorna uma **HTMLCollection** (similar a um array) de todos os elementos que possuem a classe especificada. Os elementos são retornados na ordem em que aparecem no documento.

**Exemplo:**

```html
<div class="item">Item 1</div>
<div class="item">Item 2</div>
<script>
    const itens = document.getElementsByClassName('item');
    console.log(itens.length); // Saída: 2
    console.log(itens[0].textContent); // Saída: Item 1
</script>
```

### 2.3 `document.getElementsByTagName()`

Retorna uma **HTMLCollection** de todos os elementos com o nome da tag especificado.

**Exemplo:**

```html
<ul>
    <li>Café</li>
    <li>Chá</li>
</ul>
<script>
    const listaItens = document.getElementsByTagName('li');
    console.log(listaItens[0].textContent); // Saída: Café
</script>
```

### 2.4 `document.querySelector()`

Retorna o **primeiro elemento** do documento que corresponde ao seletor CSS especificado. É um método muito versátil, pois aceita qualquer seletor CSS válido.

**Exemplo:**

```html
<div class="container">
    <p id="primeiroParagrafo">Este é o primeiro.</p>
    <p class="texto">Este é outro.</p>
</div>
<script>
    const primeiroP = document.querySelector('#primeiroParagrafo');
    console.log(primeiroP.textContent); // Saída: Este é o primeiro.

    const qualquerTexto = document.querySelector('.texto');
    console.log(qualquerTexto.textContent); // Saída: Este é outro.
</script>
```

### 2.5 `document.querySelectorAll()`

Retorna uma **NodeList** (similar a um array) de todos os elementos do documento que correspondem ao seletor CSS especificado.

**Exemplo:**

```html
<div class="item">Maçã</div>
<div class="item">Banana</div>
<script>
    const todosItens = document.querySelectorAll('.item');
    todosItens.forEach(item => {
        console.log(item.textContent);
    });
    // Saída:
    // Maçã
    // Banana
</script>
```

## 3. Manipulando Elementos HTML

Uma vez que temos acesso aos elementos, podemos modificar seu conteúdo, atributos e estilos.

### 3.1 Alterando Conteúdo HTML

*   `element.innerHTML`: Define ou retorna o conteúdo HTML (incluindo tags) de um elemento.
*   `element.textContent`: Define ou retorna o conteúdo de texto de um elemento, ignorando qualquer tag HTML interna. Mais seguro contra ataques XSS.

**Exemplo:**

```html
<div id="conteudo">Olá, <strong>mundo</strong>!</div>
<script>
    const divConteudo = document.getElementById('conteudo');

    // Usando innerHTML (pode renderizar HTML)
    divConteudo.innerHTML = 'Novo <em>conteúdo</em>!';
    console.log(divConteudo.innerHTML); // Saída: Novo <em>conteúdo</em>!

    // Usando textContent (apenas texto puro)
    divConteudo.textContent = 'Apenas texto puro.';
    console.log(divConteudo.textContent); // Saída: Apenas texto puro.
</script>
```

### 3.2 Alterando Atributos HTML

*   `element.attribute = value`: Acessa e modifica atributos comuns diretamente como propriedades JavaScript (ex: `element.id`, `element.src`).
*   `element.setAttribute(attribute, value)`: Adiciona ou modifica o valor de um atributo especificado.
*   `element.getAttribute(attribute)`: Retorna o valor de um atributo especificado.
*   `element.removeAttribute(attribute)`: Remove um atributo especificado de um elemento.

**Exemplo:**

```html
<img id="minhaImagem" src="imagem1.jpg" alt="Imagem 1">
<a id="meuLink" href="#">Clique aqui</a>
<script>
    const img = document.getElementById('minhaImagem');
    const link = document.getElementById('meuLink');

    // Alterando src e alt diretamente
    img.src = 'imagem2.jpg';
    img.alt = 'Imagem 2 atualizada';

    // Usando setAttribute para um atributo personalizado ou menos comum
    link.setAttribute('target', '_blank');

    // Obtendo atributos
    console.log(img.getAttribute('src')); // Saída: imagem2.jpg
    console.log(link.getAttribute('target')); // Saída: _blank

    // Removendo atributo
    link.removeAttribute('href');
</script>
```

### 3.3 Alterando Estilos CSS

Você pode modificar os estilos CSS de um elemento diretamente através da propriedade `style` do elemento.

*   `element.style.property = value`: Define o valor de uma propriedade CSS. Propriedades com hífens (ex: `background-color`) são convertidas para camelCase (ex: `backgroundColor`).

**Exemplo:**

```html
<p id="paragrafoEstilo">Este parágrafo terá seu estilo alterado.</p>
<script>
    const pEstilo = document.getElementById('paragrafoEstilo');

    pEstilo.style.color = 'blue';
    pEstilo.style.backgroundColor = 'yellow';
    pEstilo.style.fontSize = '20px';
</script>
```

## 4. Criando e Removendo Elementos HTML

O DOM permite criar novos elementos do zero e inseri-los na página, ou remover elementos existentes.

*   `document.createElement(tagname)`: Cria um novo elemento HTML com o nome da tag especificado.
*   `element.appendChild(child)`: Adiciona um nodo como o último filho de um elemento.
*   `element.insertBefore(newNode, referenceNode)`: Insere um novo nodo antes de um nodo de referência especificado.
*   `element.removeChild(child)`: Remove um nodo filho especificado do elemento.
*   `element.replaceChild(newNode, oldNode)`: Substitui um nodo filho por um novo nodo.

**Exemplo:**

```html
<div id="containerElementos">
    <p id="pExistente">Parágrafo existente.</p>
</div>
<script>
    const container = document.getElementById('containerElementos');

    // Criar um novo parágrafo
    const novoParagrafo = document.createElement('p');
    novoParagrafo.textContent = 'Este é um novo parágrafo!';
    novoParagrafo.style.color = 'green';

    // Adicionar como último filho
    container.appendChild(novoParagrafo);

    // Criar outro parágrafo e inserir antes do existente
    const outroParagrafo = document.createElement('p');
    outroParagrafo.textContent = 'Este foi inserido antes!';
    outroParagrafo.style.color = 'purple';
    const pExistente = document.getElementById('pExistente');
    container.insertBefore(outroParagrafo, pExistente);

    // Remover um elemento
    // container.removeChild(pExistente);

    // Substituir um elemento
    const pSubstituto = document.createElement('p');
    pSubstituto.textContent = 'Parágrafo substituto!';
    pSubstituto.style.fontWeight = 'bold';
    // container.replaceChild(pSubstituto, outroParagrafo);
</script>
```

## 5. Manipulação de Eventos

Eventos são ações que acontecem na página web, como cliques do mouse, pressionamento de teclas, carregamento da página, etc. O JavaScript permite que você responda a esses eventos.

*   `element.onclick = function`: Uma forma simples de atribuir um manipulador de eventos para o evento de clique. Funciona para a maioria dos eventos `on...`.
*   `element.addEventListener(event, function)`: O método preferido para registrar manipuladores de eventos. Permite múltiplos manipuladores para o mesmo evento e tipo de elemento.
*   `element.removeEventListener(event, function)`: Remove um manipulador de eventos que foi adicionado com `addEventListener()`.

**Exemplo:**

```html
<button id="meuBotao">Clique-me!</button>
<p id="mensagemEvento"></p>
<script>
    const botao = document.getElementById('meuBotao');
    const mensagemEvento = document.getElementById('mensagemEvento');

    // Usando onclick (método mais antigo, apenas um manipulador por evento)
    // botao.onclick = function() {
    //     mensagemEvento.textContent = 'Botão clicado com onclick!';
    // };

    // Usando addEventListener (método moderno, permite múltiplos manipuladores)
    function lidarComClique() {
        mensagemEvento.textContent = 'Botão clicado com addEventListener!';
        console.log('Evento de clique disparado!');
    }
    botao.addEventListener('click', lidarComClique);

    // Adicionando outro manipulador para o mesmo evento
    botao.addEventListener('click', function() {
        alert('Você clicou no botão!');
    });

    // Para remover um event listener, a função deve ser nomeada
    // botao.removeEventListener('click', lidarComClique);
</script>
```

## 6. Navegação na Árvore DOM

Além de selecionar elementos diretamente, você pode navegar pela árvore DOM usando propriedades de relacionamento entre nodos.

*   `parentNode`: Retorna o nodo pai de um nodo especificado.
*   `childNodes`: Retorna uma NodeList de todos os nodos filhos de um nodo (incluindo nodos de texto e comentários).
*   `children`: Retorna uma HTMLCollection de todos os nodos de *elemento* filhos de um nodo.
*   `firstChild`, `lastChild`: Retornam o primeiro/último nodo filho (pode ser texto ou comentário).
*   `firstElementChild`, `lastElementChild`: Retornam o primeiro/último nodo de *elemento* filho.
*   `nextSibling`, `previousSibling`: Retornam o próximo/anterior nodo irmão (pode ser texto ou comentário).
*   `nextElementSibling`, `previousElementSibling`: Retornam o próximo/anterior nodo de *elemento* irmão.

**Exemplo:**

```html
<div id="pai">
    <!-- Comentário -->
    <p id="filho1">Primeiro filho</p>
    Texto entre elementos
    <span id="filho2">Segundo filho</span>
</div>
<script>
    const filho2 = document.getElementById('filho2');

    console.log(filho2.parentNode.id); // Saída: pai

    const pai = document.getElementById('pai');
    console.log(pai.childNodes.length); // Inclui texto e comentários
    console.log(pai.children.length); // Apenas elementos (p, span)

    console.log(filho2.previousSibling.textContent); // Saída: Texto entre elementos
    console.log(filho2.previousElementSibling.id); // Saída: filho1
</script>
```

## 7. Exemplos Práticos e Projetos

Para consolidar o aprendizado, explore os exemplos interativos a seguir. Você pode abrir os arquivos HTML diretamente no seu navegador para ver o código em ação.

### 7.1 Exemplo 1: Contador Simples

Este exemplo demonstra a manipulação básica de conteúdo (`textContent`) e eventos (`addEventListener`) para criar um contador interativo.

**Arquivo:** `exemplo_contador.html`

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exemplo 1: Contador Simples</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            text-align: center;
        }
        .contador {
            font-size: 48px;
            font-weight: bold;
            color: #333;
            margin: 20px 0;
        }
        button {
            font-size: 18px;
            padding: 10px 20px;
            margin: 0 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .btn-incrementar {
            background-color: #4CAF50;
            color: white;
        }
        .btn-incrementar:hover {
            background-color: #45a049;
        }
        .btn-decrementar {
            background-color: #f44336;
            color: white;
        }
        .btn-decrementar:hover {
            background-color: #da190b;
        }
        .btn-reset {
            background-color: #008CBA;
            color: white;
        }
        .btn-reset:hover {
            background-color: #007B9A;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Contador Simples</h1>
        <p>Este exemplo demonstra como manipular o conteúdo de elementos HTML usando JavaScript DOM.</p>
        
        <div id="contador" class="contador">0</div>
        
        <button id="btnIncrementar" class="btn-incrementar">Incrementar (+1)</button>
        <button id="btnDecrementar" class="btn-decrementar">Decrementar (-1)</button>
        <button id="btnReset" class="btn-reset">Reset</button>
        
        <div style="margin-top: 30px;">
            <h3>Código JavaScript utilizado:</h3>
            <pre style="background: #f0f0f0; padding: 15px; border-radius: 5px; text-align: left;">
// 1. Acessando elementos pelo ID
const contadorElement = document.getElementById(\'contador\');
const btnIncrementar = document.getElementById(\'btnIncrementar\');
const btnDecrementar = document.getElementById(\'btnDecrementar\');
const btnReset = document.getElementById(\'btnReset\');

// 2. Variável para armazenar o valor atual
let valorContador = 0;

// 3. Função para atualizar o display
function atualizarContador() {
    contadorElement.textContent = valorContador;
}

// 4. Adicionando event listeners
btnIncrementar.addEventListener(\'click\', function() {
    valorContador++;
    atualizarContador();
});

btnDecrementar.addEventListener(\'click\', function() {
    valorContador--;
    atualizarContador();
});

btnReset.addEventListener(\'click\', function() {
    valorContador = 0;
    atualizarContador();
});
            </pre>
        </div>
    </div>

    <script>
        // 1. Acessando elementos pelo ID
        const contadorElement = document.getElementById(\'contador\');
        const btnIncrementar = document.getElementById(\'btnIncrementar\');
        const btnDecrementar = document.getElementById(\'btnDecrementar\');
        const btnReset = document.getElementById(\'btnReset\');

        // 2. Variável para armazenar o valor atual
        let valorContador = 0;

        // 3. Função para atualizar o display
        function atualizarContador() {
            contadorElement.textContent = valorContador;
        }

        // 4. Adicionando event listeners
        btnIncrementar.addEventListener(\'click\', function() {
            valorContador++;
            atualizarContador();
        });

        btnDecrementar.addEventListener(\'click\', function() {
            valorContador--;
            atualizarContador();
        });

        btnReset.addEventListener(\'click\', function() {
            valorContador = 0;
            atualizarContador();
        });
    </script>
</body>
</html>
```

### 7.2 Exemplo 2: Lista de Tarefas (To-Do List)

Este projeto demonstra a criação dinâmica de elementos (`createElement`, `appendChild`), remoção (`removeChild`), manipulação de classes CSS (`classList`) e gerenciamento de eventos para uma aplicação de lista de tarefas.

**Arquivo:** `exemplo_todo_list.html`

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exemplo 2: Lista de Tarefas (To-Do List)</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 700px;
            margin: 50px auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .input-container {
            display: flex;
            margin-bottom: 20px;
        }
        #inputTarefa {
            flex: 1;
            padding: 10px;
            font-size: 16px;
            border: 2px solid #ddd;
            border-radius: 5px 0 0 5px;
            outline: none;
        }
        #inputTarefa:focus {
            border-color: #4CAF50;
        }
        #btnAdicionar {
            padding: 10px 20px;
            font-size: 16px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 0 5px 5px 0;
            cursor: pointer;
        }
        #btnAdicionar:hover {
            background-color: #45a049;
        }
        .lista-tarefas {
            list-style: none;
            padding: 0;
        }
        .item-tarefa {
            background: #f9f9f9;
            margin: 10px 0;
            padding: 15px;
            border-radius: 5px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-left: 4px solid #4CAF50;
        }
        .item-tarefa.concluida {
            background: #e8f5e8;
            text-decoration: line-through;
            opacity: 0.7;
            border-left-color: #888;
        }
        .texto-tarefa {
            flex: 1;
            margin-right: 10px;
        }
        .btn-concluir {
            background-color: #2196F3;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 3px;
            cursor: pointer;
            margin-right: 5px;
        }
        .btn-concluir:hover {
            background-color: #1976D2;
        }
        .btn-remover {
            background-color: #f44336;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 3px;
            cursor: pointer;
        }
        .btn-remover:hover {
            background-color: #da190b;
        }
        .contador-tarefas {
            text-align: center;
            margin-top: 20px;
            font-weight: bold;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Lista de Tarefas (To-Do List)</h1>
        <p>Este exemplo demonstra como criar, modificar e remover elementos HTML dinamicamente.</p>
        
        <div class="input-container">
            <input type="text" id="inputTarefa" placeholder="Digite uma nova tarefa...">
            <button id="btnAdicionar">Adicionar</button>
        </div>
        
        <ul id="listaTarefas" class="lista-tarefas">
            <!-- As tarefas serão adicionadas aqui dinamicamente -->
        </ul>
        
        <div id="contadorTarefas" class="contador-tarefas">
            Total de tarefas: 0 | Concluídas: 0 | Pendentes: 0
        </div>
        
        <div style="margin-top: 30px;">
            <h3>Principais conceitos DOM demonstrados:</h3>
            <ul>
                <li><strong>document.createElement()</strong> - Criar novos elementos</li>
                <li><strong>element.appendChild()</strong> - Adicionar elementos ao DOM</li>
                <li><strong>element.removeChild()</strong> - Remover elementos do DOM</li>
                <li><strong>element.classList.add/remove()</strong> - Manipular classes CSS</li>
                <li><strong>addEventListener()</strong> - Adicionar eventos a elementos</li>
                <li><strong>element.textContent</strong> - Alterar conteúdo de texto</li>
            </ul>
        </div>
    </div>

    <script>
        // Acessando elementos do DOM
        const inputTarefa = document.getElementById(\'inputTarefa\');
        const btnAdicionar = document.getElementById(\'btnAdicionar\');
        const listaTarefas = document.getElementById(\'listaTarefas\');
        const contadorTarefas = document.getElementById(\'contadorTarefas\');

        // Array para armazenar as tarefas
        let tarefas = [];
        let proximoId = 1;

        // Função para criar um novo item de tarefa
        function criarItemTarefa(id, texto) {
            // Criar elemento &lt;li&gt;
            const li = document.createElement(\'li\');
            li.className = \'item-tarefa\';
            li.dataset.id = id;

            // Criar span para o texto da tarefa
            const spanTexto = document.createElement(\'span\');
            spanTexto.className = \'texto-tarefa\';
            spanTexto.textContent = texto;

            // Criar botão de concluir
            const btnConcluir = document.createElement(\'button\');
            btnConcluir.className = \'btn-concluir\';
            btnConcluir.textContent = \'Concluir\';
            btnConcluir.addEventListener(\'click\', function() {
                alternarConclusao(id);
            });

            // Criar botão de remover
            const btnRemover = document.createElement(\'button\');
            btnRemover.className = \'btn-remover\';
            btnRemover.textContent = \'Remover\';
            btnRemover.addEventListener(\'click\', function() {
                removerTarefa(id);
            });

            // Adicionar elementos ao &lt;li&gt;
            li.appendChild(spanTexto);
            li.appendChild(btnConcluir);
            li.appendChild(btnRemover);

            return li;
        }

        // Função para adicionar nova tarefa
        function adicionarTarefa() {
            const texto = inputTarefa.value.trim();
            
            if (texto === \'\') {
                alert(\'Por favor, digite uma tarefa!\');
                return;
            }

            // Criar objeto da tarefa
            const novaTarefa = {
                id: proximoId++,
                texto: texto,
                concluida: false
            };

            // Adicionar ao array
            tarefas.push(novaTarefa);

            // Criar elemento DOM e adicionar à lista
            const itemTarefa = criarItemTarefa(novaTarefa.id, novaTarefa.texto);
            listaTarefas.appendChild(itemTarefa);

            // Limpar input
            inputTarefa.value = \'\';

            // Atualizar contador
            atualizarContador();
        }

        // Função para alternar conclusão da tarefa
        function alternarConclusao(id) {
            // Encontrar tarefa no array
            const tarefa = tarefas.find(t => t.id === id);
            if (tarefa) {
                tarefa.concluida = !tarefa.concluida;

                // Encontrar elemento no DOM
                const elemento = document.querySelector(`[data-id="${id}"]`);
                if (tarefa.concluida) {
                    elemento.classList.add(\'concluida\');
                    elemento.querySelector(\'.btn-concluir\').textContent = \'Desfazer\';
                } else {
                    elemento.classList.remove(\'concluida\');
                    elemento.querySelector(\'.btn-concluir\').textContent = \'Concluir\';
                }

                atualizarContador();
            }
        }

        // Função para remover tarefa
        function removerTarefa(id) {
            // Remover do array
            tarefas = tarefas.filter(t => t.id !== id);

            // Remover do DOM
            const elemento = document.querySelector(`[data-id="${id}"]`);
            listaTarefas.removeChild(elemento);

            atualizarContador();
        }

        // Função para atualizar contador
        function atualizarContador() {
            const total = tarefas.length;
            const concluidas = tarefas.filter(t => t.concluida).length;
            const pendentes = total - concluidas;

            contadorTarefas.textContent = `Total de tarefas: ${total} | Concluídas: ${concluidas} | Pendentes: ${pendentes}`;
        }

        // Event listeners
        btnAdicionar.addEventListener(\'click\', adicionarTarefa);

        // Permitir adicionar tarefa pressionando Enter
        inputTarefa.addEventListener(\'keypress\', function(e) {
            if (e.key === \'Enter\') {
                adicionarTarefa();
            }
        });

        // Inicializar contador
        atualizarContador();
    </script>
</body>
</html>
```

### 7.3 Exemplo 3: Galeria de Imagens Simples

Este exemplo explora a manipulação de atributos (`setAttribute`, `getAttribute`), estilos (`element.style`), classes (`classList`) e a criação de um modal para exibir imagens ampliadas, além de filtros por categoria.

**Arquivo:** `exemplo_galeria.html`

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exemplo 3: Galeria de Imagens</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .galeria {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        .item-galeria {
            position: relative;
            border-radius: 8px;
            overflow: hidden;
            cursor: pointer;
            transition: transform 0.3s ease;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .item-galeria:hover {
            transform: scale(1.05);
        }
        .item-galeria img {
            width: 100%;
            height: 150px;
            object-fit: cover;
            display: block;
        }
        .legenda {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(transparent, rgba(0,0,0,0.7));
            color: white;
            padding: 20px 10px 10px;
            font-size: 14px;
            text-align: center;
        }
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.8);
        }
        .modal-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            max-width: 90%;
            max-height: 90%;
        }
        .modal-content img {
            width: 100%;
            height: auto;
            border-radius: 8px;
        }
        .fechar {
            position: absolute;
            top: 15px;
            right: 25px;
            color: white;
            font-size: 35px;
            font-weight: bold;
            cursor: pointer;
        }
        .fechar:hover {
            color: #ccc;
        }
        .controles {
            text-align: center;
            margin: 20px 0;
        }
        .btn-filtro {
            background-color: #2196F3;
            color: white;
            border: none;
            padding: 8px 16px;
            margin: 0 5px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .btn-filtro:hover {
            background-color: #1976D2;
        }
        .btn-filtro.ativo {
            background-color: #4CAF50;
        }
        .info-imagem {
            text-align: center;
            margin-top: 15px;
            color: white;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Galeria de Imagens Interativa</h1>
        <p>Este exemplo demonstra manipulação de atributos, estilos CSS e navegação no DOM.</p>
        
        <div class="controles">
            <button class="btn-filtro ativo" data-categoria="todas">Todas</button>
            <button class="btn-filtro" data-categoria="natureza">Natureza</button>
            <button class="btn-filtro" data-categoria="cidade">Cidade</button>
            <button class="btn-filtro" data-categoria="animais">Animais</button>
        </div>
        
        <div id="galeria" class="galeria">
            <!-- As imagens serão adicionadas aqui dinamicamente -->
        </div>
        
        <div style="margin-top: 30px;">
            <h3>Conceitos DOM demonstrados:</h3>
            <ul>
                <li><strong>element.setAttribute()</strong> - Definir atributos de elementos</li>
                <li><strong>element.getAttribute()</strong> - Obter valores de atributos</li>
                <li><strong>element.style.property</strong> - Manipular estilos CSS</li>
                <li><strong>element.classList</strong> - Adicionar/remover classes CSS</li>
                <li><strong>querySelectorAll()</strong> - Selecionar múltiplos elementos</li>
                <li><strong>dataset</strong> - Trabalhar com atributos data-*</li>
            </ul>
        </div>
    </div>

    <!-- Modal para exibir imagem ampliada -->
    <div id="modal" class="modal">
        <span class="fechar">&times;</span>
        <div class="modal-content">
            <img id="imagemModal" src="" alt="">
            <div id="infoImagem" class="info-imagem"></div>
        </div>
    </div>

    <script>
        // Dados das imagens (simulando uma API ou banco de dados)
        const imagensData = [
            {
                id: 1,
                src: \'https://picsum.photos/300/200?random=1\',
                alt: \'Paisagem montanhosa\',
                categoria: \'natureza\',
                titulo: \'Montanhas ao Pôr do Sol\'
            },
            {
                id: 2,
                src: \'https://picsum.photos/300/200?random=2\',
                alt: \'Cidade moderna\',
                categoria: \'cidade\',
                titulo: \'Skyline Urbano\'
            },
            {
                id: 3,
                src: \'https://picsum.photos/300/200?random=3\',
                alt: \'Gato fofo\',
                categoria: \'animais\',
                titulo: \'Gato Doméstico\'
            },
            {
                id: 4,
                src: \'https://picsum.photos/300/200?random=4\',
                alt: \'Floresta verde\',
                categoria: \'natureza\',
                titulo: \'Floresta Tropical\'
            },
            {
                id: 5,
                src: \'https://picsum.photos/300/200?random=5\',
                alt: \'Rua da cidade\',
                categoria: \'cidade\',
                titulo: \'Rua Movimentada\'
            },
            {
                id: 6,
                src: \'https://picsum.photos/300/200?random=6\',
                alt: \'Cachorro brincando\',
                categoria: \'animais\',
                titulo: \'Cachorro no Parque\'
            }
        ];

        // Acessando elementos do DOM
        const galeria = document.getElementById(\'galeria\');
        const modal = document.getElementById(\'modal\');
        const imagemModal = document.getElementById(\'imagemModal\');
        const infoImagem = document.getElementById(\'infoImagem\');
        const btnFechar = document.querySelector(\'.fechar\');
        const btnsFiltro = document.querySelectorAll(\'.btn-filtro\');

        // Função para criar um item da galeria
        function criarItemGaleria(imagem) {
            // Criar div container
            const div = document.createElement(\'div\');
            div.className = \'item-galeria\';
            div.dataset.categoria = imagem.categoria;
            div.dataset.id = imagem.id;

            // Criar elemento img
            const img = document.createElement(\'img\');
            img.src = imagem.src;
            img.alt = imagem.alt;
            img.setAttribute(\'loading\', \'lazy\'); // Lazy loading

            // Criar legenda
            const legenda = document.createElement(\'div\');
            legenda.className = \'legenda\';
            legenda.textContent = imagem.titulo;

            // Adicionar elementos ao container
            div.appendChild(img);
            div.appendChild(legenda);

            // Adicionar evento de clique para abrir modal
            div.addEventListener(\'click\', function() {
                abrirModal(imagem);
            });

            return div;
        }

        // Função para renderizar a galeria
        function renderizarGaleria(imagens = imagensData) {
            // Limpar galeria
            galeria.innerHTML = \'\';

            // Adicionar cada imagem
            imagens.forEach(imagem => {
                const item = criarItemGaleria(imagem);
                galeria.appendChild(item);
            });
        }

        // Função para filtrar imagens por categoria
        function filtrarPorCategoria(categoria) {
            const itens = document.querySelectorAll(\'.item-galeria\');
            
            itens.forEach(item => {
                if (categoria === \'todas\' || item.dataset.categoria === categoria) {
                    item.style.display = \'block\';
                    // Animação de entrada
                    item.style.opacity = \'0\';
                    item.style.transform = \'scale(0.8)\';
                    setTimeout(() => {
                        item.style.transition = \'opacity 0.3s ease, transform 0.3s ease\';
                        item.style.opacity = \'1\';
                        item.style.transform = \'scale(1)\';
                    }, 50);
                } else {
                    item.style.display = \'none\';
                }
            });
        }

        // Função para abrir modal
        function abrirModal(imagem) {
            imagemModal.src = imagem.src;
            imagemModal.alt = imagem.alt;
            infoImagem.textContent = `${imagem.titulo} - Categoria: ${imagem.categoria}`;
            modal.style.display = \'block\';
            
            // Adicionar classe para animação
            modal.style.opacity = \'0\';
            setTimeout(() => {
                modal.style.transition = \'opacity 0.3s ease\';
                modal.style.opacity = \'1\';
            }, 10);
        }

        // Função para fechar modal
        function fecharModal() {
            modal.style.opacity = \'0\';
            setTimeout(() => {
                modal.style.display = \'none\';
            }, 300);
        }

        // Event listeners para filtros
        btnsFiltro.forEach(btn => {
            btn.addEventListener(\'click\', function() {
                // Remover classe ativo de todos os botões
                btnsFiltro.forEach(b => b.classList.remove(\'ativo\'));
                
                // Adicionar classe ativo ao botão clicado
                this.classList.add(\'ativo\');
                
                // Filtrar imagens
                const categoria = this.getAttribute(\'data-categoria\');
                filtrarPorCategoria(categoria);
            });
        });

        // Event listeners para modal
        btnFechar.addEventListener(\'click\', fecharModal);
        
        modal.addEventListener(\'click\', function(e) {
            if (e.target === modal) {
                fecharModal();
            }
        });

        // Fechar modal com tecla ESC
        document.addEventListener(\'keydown\', function(e) {
            if (e.key === \'Escape\' && modal.style.display === \'block\') {
                fecharModal();
            }
        });

        // Inicializar galeria
        renderizarGaleria();

        // Demonstração adicional: Alterar tema da galeria
        function alternarTema() {
            const body = document.body;
            if (body.style.backgroundColor === \'rgb(51, 51, 51)\' || body.style.backgroundColor === \'#333\') {
                body.style.backgroundColor = \'#f5f5f5\';
                body.style.color = \'#333\';
            } else {
                body.style.backgroundColor = \'#333\';
                body.style.color = \'#fff\';
            }
        }

        // Adicionar botão para alternar tema
        const btnTema = document.createElement(\'button\');
        btnTema.textContent = \'Alternar Tema\';
        btnTema.className = \'btn-filtro\';
        btnTema.style.marginLeft = \'20px\';
        btnTema.addEventListener(\'click\', alternarTema);
        document.querySelector(\'.controles\').appendChild(btnTema);
    </script>
</body>
</html>
```