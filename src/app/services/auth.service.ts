import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface Usuario {
  id?: number;
  nome: string;
  email: string;
  senha: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API = 'http://localhost:3000';
  private readonly URL = `${this.API}/usuarios`;

  private http = inject(HttpClient);

  // sessão em memória
  private _usuarioLogado = signal<Usuario | null>(null);

  usuarioLogado = this._usuarioLogado.asReadonly();

  // =========================
  // HELPERS
  // =========================

  private normalizarEmail(email: string) {
    return email.trim().toLowerCase();
  }

  private async obterUsuarios(): Promise<Usuario[]> {

    return await firstValueFrom(
      this.http.get<Usuario[]>(this.URL)
    );
  }

  // =========================
  // AUTH
  // =========================

  isAuthenticated() {
    return !!this._usuarioLogado();
  }

  currentUser(): Usuario | null {
    return this._usuarioLogado();
  }

  // =========================
  // REGISTER
  // =========================

  register(input: {
    nome: string;
    email: string;
    senha: string;
  }) {

    return (async () => {

      const nome = input.nome.trim();
      const email = this.normalizarEmail(input.email);
      const senha = input.senha;

      // validações
      if (!nome) {
        throw new Error('Informe seu nome.');
      }

      if (!email) {
        throw new Error('Informe seu email.');
      }

      if (!senha || senha.length < 4) {
        throw new Error(
          'A senha deve ter pelo menos 4 caracteres.'
        );
      }

      // verifica usuários existentes
      const usuarios = await this.obterUsuarios();

      const exists = usuarios.some(
        u => this.normalizarEmail(u.email) === email
      );

      if (exists) {
        throw new Error(
          'Já existe um usuário com este email.'
        );
      }

      const novoId =
        (usuarios.reduce((max, u) => (u.id && u.id > max ? u.id : max), 0) || 0) + 1;

      const payload: Usuario = {
        id: novoId,
        nome,
        email,
        senha
      };

      // salva no JSON Server
      const criado = await firstValueFrom(
        this.http.post<Usuario>(
          this.URL,
          payload
        )
      );


      // login automático
      await this.login({
        email,
        senha
      });

      return criado;

    })();
  }

  // =========================
  // LOGIN
  // =========================

  login(input: {
    email: string;
    senha: string;
  }) {

    return (async () => {

      const email = this.normalizarEmail(input.email);
      const senha = input.senha;

      const usuarios = await this.obterUsuarios();

      const user = usuarios.find(
        u =>
          this.normalizarEmail(u.email) === email &&
          u.senha === senha
      );

      if (!user) {
        throw new Error(
          'Email ou senha inválidos.'
        );
      }

      this._usuarioLogado.set(user);

      return user;

    })();
  }

  // =========================
  // LISTAR USUÁRIOS
  // =========================

  async listarUsuarios(): Promise<Usuario[]> {

    return await firstValueFrom(
      this.http.get<Usuario[]>(this.URL)
    );
  }

  // =========================
  // EXCLUIR USUÁRIO
  // =========================

  async excluirUsuario(id: number) {

    return await firstValueFrom(
      this.http.delete(
        `${this.URL}/${id}`
      )
    );
  }

  // =========================
  // ATUALIZAR USUÁRIO
  // =========================

  async atualizarUsuario(usuario: Usuario) {

    if (!usuario.id) {
      throw new Error('Usuário sem ID.');
    }

    return await firstValueFrom(

      this.http.put<Usuario>(
        `${this.URL}/${usuario.id}`,
        usuario
      )

    );
  }

  // =========================
  // LOGOUT
  // =========================

  logout() {
    this._usuarioLogado.set(null);
  }

  isAdmin(): boolean {
    const user = this._usuarioLogado();
    return user?.email === 'admin@darktech.com'; // 👈 email fixo do admin
  }

}