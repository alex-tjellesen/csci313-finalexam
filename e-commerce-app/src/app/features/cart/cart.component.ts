import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/data/cart.service';
import { CartItem } from 'src/app/core/data/cart-item';
import { OrderService } from 'src/app/core/data/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalCost: number = 0;
  displayedColumns: string[] = ['name', 'price', 'quantity', 'actions'];

  constructor(
    private cartService: CartService, 
    private orderService: OrderService, 
    ) { }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.totalCost = this.cartService.getTotalCost();
    });
  }

  removeItemFromCart(productId: number): void {
    this.cartService.removeItemFromCart(productId);
  }
  
  clearCart(): void {
    this.cartService.clearCart();
  }

  order(): void{
    this.orderService.order(this.cartItems, this.totalCost);
  }
}