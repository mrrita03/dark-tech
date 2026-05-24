import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email = '';
  senha = '';
  erro = '';

  constructor(private auth: AuthService, private router: Router) {}

  async entrar() {
    this.erro = '';
    try {
      await this.auth.login({ email: this.email, senha: this.senha });
      this.router.navigate(['/']);
    } catch (e: any) {
      this.erro = e?.message ?? 'Falha ao entrar.';
    }
  }
}



