import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // 🌐 URL do JSON Server
  private readonly apiUrl = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) {}

  // 📥 LISTAR PRODUTOS (GET)
  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }

  // ➕ ADICIONAR PRODUTO (POST)
  addProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, produto);
  }

  // ❌ DELETAR PRODUTO (DELETE)
  deleteProduto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // ✏️ ATUALIZAR PRODUTO (PUT)
  updateProduto(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(
      `${this.apiUrl}/${produto.id}`,
      produto
    );
  }
}