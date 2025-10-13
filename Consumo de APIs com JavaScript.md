# Material Didático: Consumo de APIs com JavaScript

## Introdução: O Poder das APIs

No desenvolvimento web moderno, a capacidade de comunicar-se com serviços externos é fundamental. É aqui que entram as **APIs** (Application Programming Interfaces).

Uma API atua como um intermediário que permite que dois sistemas de software diferentes se comuniquem. No contexto web, isso geralmente significa que seu código JavaScript (o **cliente**) pode solicitar dados ou funcionalidades de um servidor externo (o **serviço**).

### Por Que Consumir APIs?

O consumo de APIs permite que as aplicações:
1.  **Acessem dados dinâmicos:** Obter informações atualizadas em tempo real, como cotações de moedas, dados climáticos ou, no nosso caso, informações sobre Pokémon.
2.  **Utilizem funcionalidades de terceiros:** Integrar recursos complexos sem precisar desenvolvê-los do zero (ex: mapas, pagamentos, autenticação).
3.  **Separem a lógica:** Manter a interface do usuário (frontend) separada da lógica de negócios e do banco de dados (backend).

## Conceitos Fundamentais de Requisições HTTP

A comunicação entre o cliente e a API é feita através do protocolo **HTTP** (Hypertext Transfer Protocol).

### Verbos HTTP (Métodos)

Os verbos HTTP definem o tipo de ação que o cliente deseja realizar no recurso da API:

| Verbo HTTP | Ação Principal | Descrição |
| :--- | :--- | :--- |
| **GET** | Leitura | Solicita dados de um recurso específico. É o método mais comum para consumo de APIs. |
| **POST** | Criação | Envia dados para o servidor para criar um novo recurso. |
| **PUT** | Atualização | Substitui todas as representações atuais do recurso de destino pelos dados da requisição. |
| **DELETE** | Exclusão | Remove o recurso especificado. |

### Códigos de Status HTTP

Após uma requisição, o servidor responde com um código de status que indica o resultado da operação:

| Faixa de Código | Significado | Exemplos Comuns |
| :--- | :--- | :--- |
| **2xx** | Sucesso | `200 OK` (Requisição bem-sucedida) |
| **3xx** | Redirecionamento | `301 Moved Permanently` |
| **4xx** | Erro do Cliente | `404 Not Found` (Recurso não encontrado), `401 Unauthorized` |
| **5xx** | Erro do Servidor | `500 Internal Server Error` |

## JSON: O Formato de Dados Padrão

A maioria das APIs RESTful modernas usa **JSON** (JavaScript Object Notation) para enviar e receber dados. O JSON é um formato leve e de fácil leitura e escrita por humanos, e de fácil análise e geração por máquinas.

Em JavaScript, a conversão entre strings JSON e objetos JavaScript é feita com os métodos:
*   `JSON.parse(string)`: Converte uma string JSON em um objeto JavaScript.
*   `JSON.stringify(objeto)`: Converte um objeto JavaScript em uma string JSON.

## Consumo de API em JavaScript: A Fetch API

A maneira mais moderna e recomendada de fazer requisições HTTP em JavaScript é usando a **Fetch API**.

A `fetch()` retorna uma **Promise**, que é um objeto que representa a eventual conclusão (ou falha) de uma operação assíncrona.

### 1. Requisição Básica com `.then()`

O método `fetch()` recebe a URL da API como argumento e retorna uma Promise que resolve para o objeto `Response`.

```javascript
fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
    .then(response => {
        // A primeira Promise resolve para o objeto Response.
        // Precisamos chamar .json() para extrair o corpo da resposta como JSON.
        return response.json();
    })
    .then(data => {
        // A segunda Promise resolve para os dados JSON.
        console.log('Nome do Pokémon:', data.name);
        console.log('Altura:', data.height);
        console.log('Peso:', data.weight);
    })
    .catch(error => {
        // Captura qualquer erro que ocorra durante a requisição ou processamento.
        console.error('Erro ao buscar dados:', error);
    });
```

### 2. A Abordagem Moderna: `async/await`

Para um código mais limpo e que se parece mais com código síncrono, usamos as palavras-chave `async` e `await`.

*   A função que contém o `await` deve ser marcada como `async`.
*   O `await` pausa a execução da função `async` até que a Promise seja resolvida.

```javascript
async function buscarPokemon(nomeOuId) {
    const url = `https://pokeapi.co/api/v2/pokemon/${nomeOuId}`;

    try {
        // 1. Faz a requisição e espera a resposta
        const response = await fetch(url);

        // 2. Verifica se a resposta foi bem-sucedida (status 200-299)
        if (!response.ok) {
            // Lança um erro se o status HTTP for de falha (ex: 404)
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        // 3. Extrai os dados JSON e espera a conversão
        const data = await response.json();

        // 4. Retorna ou processa os dados
        return data;

    } catch (error) {
        // 5. Captura e trata erros de rede ou erros lançados acima
        console.error('Falha na busca:', error);
        return null; // Retorna nulo ou um objeto de erro
    }
}

// Exemplo de uso:
buscarPokemon('charizard').then(pokemon => {
    if (pokemon) {
        console.log(`Pokémon encontrado: ${pokemon.name}`);
        console.log(`Tipos: ${pokemon.types.map(t => t.type.name).join(', ')}`);
    }
});
```

## Trabalhando com Múltiplas Requisições: `Promise.all()`

Quando precisamos buscar dados de várias URLs ao mesmo tempo, podemos usar `Promise.all()` para executar todas as requisições em paralelo, o que é muito mais eficiente do que fazer uma por vez.

```javascript
async function buscarVariosPokemon(listaDeNomes) {
    try {
        // Cria um array de Promises (uma para cada requisição)
        const promises = listaDeNomes.map(nome => 
            fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`).then(res => res.json())
        );

        // Aguarda todas as Promises serem resolvidas
        const resultados = await Promise.all(promises);

        return resultados;

    } catch (error) {
        console.error('Erro ao buscar pokémon:', error);
        return [];
    }
}

// Exemplo de uso:
buscarVariosPokemon(['bulbasaur', 'charmander', 'squirtle']).then(pokemons => {
    pokemons.forEach(pokemon => {
        console.log(`${pokemon.name} - Tipo: ${pokemon.types[0].type.name}`);
    });
});
```

## Projeto Prático: Pokédex Explorer

Para praticar o consumo de APIs, desenvolveremos um pequeno aplicativo que interage com a **PokéAPI**.

### Sobre a API

*   **URL Base:** `https://pokeapi.co/api/v2`
*   **Recurso Principal:** Pokémon (`/pokemon`)
*   **Vantagens:** Não requer chave de API, tem documentação clara e retorna dados em JSON simples, ideal para aprendizado.

### Objetivo do Projeto

Criar uma página web simples que:
1.  Busque uma lista de Pokémon ao carregar a página.
2.  Exiba o nome, ID, tipos, altura, peso e imagem de cada Pokémon.
3.  Permita a navegação entre as páginas de resultados (Paginação).
4.  Permita buscar um Pokémon específico por nome ou número.

Este projeto consolidará o uso da `Fetch API` com `async/await`, manipulação de JSON, uso de `Promise.all()` para requisições paralelas e a renderização dinâmica de elementos HTML.

