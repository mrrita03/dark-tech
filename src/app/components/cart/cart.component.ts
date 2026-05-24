import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {

  constructor(
    public cartService: CartService,
    private auth: AuthService,
    private router: Router
  ) {}

  get itens() {
    return this.cartService.getCartItems();
  }

  quantidadeTotal = computed(() =>
    this.cartService.getCartItems()().reduce(
      (total, item) => total + item.quantidade,
      0
    )
  );

  total = computed(() =>
    this.cartService.getCartItems()().reduce(
      (total, item) =>
        total + item.produto.preco * item.quantidade,
      0
    )
  );

  remover(id: number) {
    this.cartService.removerDoCarrinho(id);
  }

  limpar() {
    this.cartService.limparCarrinho();
  }

  finalizarCompra() {
    if (!this.auth.isAuthenticated()) {
      alert('Faça login para finalizar sua compra.');
      this.router.navigate(['/login']);
      return;
    }

     this.router.navigate(['/order-confirm']);
  }
}