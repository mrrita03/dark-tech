# TODO - Integração JSON Server (Angular)

- [ ] Entender a estrutura atual do app.component.ts e carrinho
- [ ] Definir interfaces `Produto` e `Usuario` com `id: number`
- [ ] Injetar `HttpClient` via `private http = inject(HttpClient);`
- [ ] Definir `private API = 'http://localhost:3000';`
- [ ] Implementar CRUD no `app.component.ts`: `listarProdutos`, `excluirProduto`, `listarUsuarios`, `excluirUsuario`
- [ ] Aplicar regra de IDs: ao criar novo registro, usar maiorId + 1 e `http.put(/recurso/novoId)`
- [ ] Adicionar estado local de carrinho: `Produto[] = []`, `adicionarAoCarrinho(produto)` e getter `totalGeral`
- [ ] Entregar `app.component.ts` completo integrado (sem remover estrutura existente)
- [ ] (Após mudanças) testar build/execução se necessário

