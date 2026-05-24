import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  nome = '';
  email = '';
  senha = '';
  erro = '';

  constructor(private auth: AuthService, private router: Router) {}

  async cadastrar() {
    this.erro = '';
    try {
      await this.auth.register({ nome: this.nome, email: this.email, senha: this.senha });
      this.router.navigate(['/']);
    } catch (e: any) {
      this.erro = e?.message ?? 'Falha ao cadastrar.';
    }
  }
}



