import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  email = '';
  novaSenha = '';
  erro = '';
  sucesso = '';

  constructor(private auth: AuthService, private router: Router) {}

  async resetar() {
    this.erro = '';
    this.sucesso = '';

    try {
      const usuarios = await this.auth.listarUsuarios();
      const usuario = usuarios.find(u => u.email.toLowerCase() === this.email.toLowerCase().trim());

      if (!usuario) {
        throw new Error('Email não encontrado.');
      }

      await this.auth.atualizarUsuario({ ...usuario, senha: this.novaSenha });
      this.sucesso = 'Senha atualizada com sucesso!';

      setTimeout(() => this.router.navigate(['/login']), 2000);

    } catch (e: any) {
      this.erro = e?.message ?? 'Erro ao resetar senha.';
    }
  }
}