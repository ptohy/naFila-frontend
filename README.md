# naFila - Frontend

# Descrição:
Frontend desenvolvido com HTML5, CSS3 e JavaScript (Vanilla JS) para consumir a API `naFila`. A interface permite cadastrar, visualizar, reordenar e remover conteúdos da fila de forma interativa.

# Tecnologias:
- HTML5
- CSS3
- JavaScript (Puro, sem frameworks)

# Como Executar:
1. **Garanta que o Backend esteja rodando.** A API precisa estar acessível em `http://127.0.0.1:5000`.

2. **Abra o arquivo `index.html`:**
   Não é necessário um servidor web. Basta abrir o arquivo `index.html` diretamente no seu navegador de preferência (Ex: Google Chrome, Firefox).

# Funcionalidades
- **Cadastro de Conteúdos:** Formulário para adicionar novos itens à fila.
- **Visualização em Cards:** Exibição de todos os conteúdos em um layout de cards responsivo.
- **Deleção de Conteúdos:** Botão para remover itens da fila.
- **Consumo da API:** Realiza chamadas para as rotas `/cadastrar`, `/listar` e `/deletar` do backend.