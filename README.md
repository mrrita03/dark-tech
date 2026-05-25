# 🎮 DarkTech — Loja Gamer

> E-commerce de equipamentos gamer com visual neon e experiência moderna.

---

## 📋 Sobre o Projeto

DarkTech é uma loja virtual desenvolvida com Angular e JSON Server, com foco em praticar **CRUD completo**, autenticação de usuários e gerenciamento de produtos.

O sistema conta com área administrativa, carrinho de compras e fluxo completo de compra.

---

## 🚀 Funcionalidades

- 🛍️ Listagem de produtos com categorias  
- 🔍 Página de detalhes do produto  
- 🛒 Carrinho de compras funcional  
- ✅ Finalização de pedido  
- 👤 Login e cadastro de usuários  
- 🔐 Área administrativa (CRUD de produtos)  
- 📱 Feedback visual (toast/notificações)

---

## ⚙️ Tecnologias Utilizadas

- Angular (Standalone Components)  
- TypeScript  
- SCSS  
- JSON Server (API fake)  
- RxJS  

---

## ▶️ Como rodar o projeto

### 🔧 Pré-requisitos
- Node.js instalado
- Angular CLI instalado

---

### 📦 Instalação

```bash
npm install
```

---

### 🚀 Rodando o projeto

Abra dois terminais:

#### 🟢 Terminal 1 — Backend (JSON Server)
```bash
npx json-server --watch backend/db.json
```

#### 🟢 Terminal 2 — Frontend (Angular)
```bash
ng serve
```

---

### 🌐 Acesse no navegador

```
http://localhost:4200
```

---

## 👤 Usuário Administrador

- 📧 Email: admin@darktech.com  
- 🔑 Senha: 2026  

👉 O admin pode criar, editar e excluir produtos.

---

## 📦 CRUD de Produtos

| Operação | Descrição |
|----------|-----------|
| ➕ Create | Cadastrar novo produto |
| 📋 Read   | Listar produtos |
| ✏️ Update | Editar produtos |
| 🗑️ Delete | Remover produtos |

---

## 💡 Observação

Este projeto utiliza **JSON Server** como backend simulado.  
Portanto, os produtos só aparecem quando o servidor está rodando localmente.

---

## 👨‍💻 Autor

Projeto desenvolvido por **Maria Rita**  
Fins acadêmicos — foco em Angular + CRUD + JSON SERVER
