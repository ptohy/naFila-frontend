
# naFila - Frontend
 
Aplicação web para gerenciar livros, filmes, séries, vídeos, podcasts e artigos, controlando seu progresso, prioridades e status.

## Visão Geral

Este é o frontend do projeto **naFila**, desenvolvido como parte do MVP da pós-graduação em Desenvolvimento Full Stack da PUC RIO.  
O projeto é uma **SPA (Single Page Application)** feita com **HTML + CSS + JavaScript**, sem frameworks, conforme os requisitos.

O frontend consome uma API Flask que fornece todos os dados e ações necessárias.

---

## Funcionalidades

- ✅ Adicionar novos conteúdos (livros, vídeos, podcasts, etc).
- ✅ Categorizar por tipo (livro, vídeo, podcast, artigo).
- ✅ Definir status: `A Fazer`, `Fazendo`, `Concluído`.
- ✅ Acompanhar o progresso (%).
- ✅ Editar e excluir conteúdos.
- ✅ Organizar e priorizar os itens com **drag & drop**.
- ✅ Filtros por tipo e status.
- ✅ Busca por título. 

---

## Como Executar o Projeto

### Pré-requisitos:
- Ter a API (backend) em execução localmente.  
Se ainda não configurou, acesse: [Repositório Backend](https://github.com/ptohy/nafila-backend)

### Passos:

1. Faça o download ou clone deste repositório:

```bash
git clone https://github.com/ptohy/naFila-frontend.git
```

2. Acesse a pasta do projeto:

```bash 
cd naFila-frontend
```

3. Abra o arquivo `index.html` diretamente no seu navegador:  
**Funciona diretamente, sem necessidade de servidor local.**

4. Garanta que o backend esteja rodando em `http://127.0.0.1:5000` ou altere no código (`assets/js/script.js`) o endpoint da API, caso necessário.
