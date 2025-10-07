# Guia Prático de localStorage em JavaScript: Introdução, Fundamentos e Catálogo de Filmes (CRUD)

O `localStorage` é uma ferramenta essencial para desenvolvedores web que buscam persistir dados no lado do cliente. Este material prático fornece uma introdução clara, uma explicação técnica detalhada e a construção de um sistema CRUD (Criar, Ler, Atualizar, Deletar) simples, agora aplicado a um **Catálogo de Filmes**, para demonstrar seu uso.

## 1. Introdução: O que é localStorage?

O `localStorage` faz parte da **Web Storage API** do JavaScript, um conjunto de mecanismos que permite que aplicações web armazenem dados localmente no navegador do usuário [1]. Antes da Web Storage API, a principal forma de persistir dados no cliente eram os *cookies*, que possuíam limitações significativas de tamanho (cerca de 4KB) e eram enviados a cada requisição HTTP, o que podia sobrecarregar a rede.

O `localStorage` resolve esses problemas oferecendo um espaço de armazenamento muito maior (geralmente **5MB** por domínio) e não enviando os dados automaticamente ao servidor.

### localStorage vs. sessionStorage

É crucial entender a diferença entre os dois principais mecanismos da Web Storage API:

| Característica | `localStorage` | `sessionStorage` |
| :--- | :--- | :--- |
| **Persistência** | Permanente. Os dados **não expiram** e persistem mesmo após o fechamento do navegador ou reinício do computador. | Temporária. Os dados são limpos quando a **sessão da página** (aba ou janela) é encerrada. |
| **Acesso** | Acessível por qualquer página do mesmo domínio. | Acessível apenas pela página que o criou, dentro da mesma aba. |
| **Uso Comum** | Preferências do usuário (tema, idioma), tokens de autenticação não sensíveis, cache de dados estáticos. | Armazenamento de estado temporário da sessão (carrinho de compras, dados de formulário). |

## 2. Explicação Técnica e Limitações

O `localStorage` armazena dados como pares de **chave-valor**, onde tanto a chave quanto o valor devem ser **strings**.

### Serialização de Dados

Como o `localStorage` só aceita strings, para armazenar estruturas de dados mais complexas, como objetos ou arrays, é necessário realizar a **serialização** e **desserialização** manual utilizando o objeto `JSON`.

*   **Para Salvar (Serialização):** Use `JSON.stringify()` para converter o objeto JavaScript em uma string JSON.
*   **Para Ler (Desserialização):** Use `JSON.parse()` para converter a string JSON de volta para um objeto JavaScript.

### Limitações e Considerações de Segurança

1.  **Limite de Armazenamento:** Embora seja maior que o dos *cookies*, o limite de 5MB por domínio ainda exige que o desenvolvedor use o `localStorage` com moderação.
2.  **Sincronia:** As operações de leitura e escrita são síncronas, o que significa que podem bloquear a *thread* principal do JavaScript. Para grandes volumes de dados, o uso de tecnologias assíncronas como o **IndexedDB** é mais recomendado.
3.  **Segurança (XSS):** Os dados no `localStorage` são acessíveis via JavaScript. Se o seu site for vulnerável a ataques de *Cross-Site Scripting* (XSS), um invasor pode ler todos os dados armazenados. **Portanto, nunca armazene informações sensíveis como senhas ou dados de cartão de crédito no `localStorage`**.

## 3. Métodos Essenciais do localStorage

O objeto `localStorage` fornece quatro métodos principais para interagir com o armazenamento:

| Método | Descrição | Exemplo de Uso |
| :--- | :--- | :--- |
| `localStorage.setItem(chave, valor)` | Armazena um par chave-valor. Se a chave já existir, o valor é atualizado. | `localStorage.setItem('usuario', 'Manus AI');` |
| `localStorage.getItem(chave)` | Retorna o valor associado à chave especificada. Retorna `null` se a chave não for encontrada. | `const nome = localStorage.getItem('usuario');` |
| `localStorage.removeItem(chave)` | Remove o par chave-valor do armazenamento. | `localStorage.removeItem('usuario');` |
| `localStorage.clear()` | Remove **todos** os pares chave-valor do `localStorage` para o domínio atual. **Use com cautela!** | `localStorage.clear();` |

---

### Exemplo Prático dos Métodos

```javascript
// 1. Armazenando um valor simples (string)
localStorage.setItem('tema', 'dark');

// 2. Armazenando um objeto (requer serialização)
const perfil = { id: 1, nome: 'Alice', email: 'alice@exemplo.com' };
localStorage.setItem('perfilUsuario', JSON.stringify(perfil));

// 3. Recuperando um valor simples
const temaAtual = localStorage.getItem('tema');
console.log(`Tema atual: ${temaAtual}`); // Saída: dark

// 4. Recuperando um objeto (requer desserialização)
const perfilString = localStorage.getItem('perfilUsuario');
const perfilObjeto = JSON.parse(perfilString);
console.log(`Nome do usuário: ${perfilObjeto.nome}`); // Saída: Alice

// 5. Removendo um item
localStorage.removeItem('tema');

// 6. Verificando se o item foi removido
console.log(localStorage.getItem('tema')); // Saída: null
```
---