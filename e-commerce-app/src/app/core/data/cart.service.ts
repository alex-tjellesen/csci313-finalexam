import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from './cart-item';
import { Product } from 'src/app/features/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);

  constructor() {
    this.loadCartItems();
  }

  public getCartItems(): Observable<CartItem[]> {
    return this.cartItemsSubject.asObservable();
  }

  private loadCartItems(): void {
    const storedCartItems = sessionStorage.getItem('cartItems');
    const cartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
    this.cartItemsSubject.next(cartItems);
  }

  private saveCartItems(cartItems: CartItem[]): void {
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    this.cartItemsSubject.next(cartItems);
  }

  public addItemToCart(product: Product): void {
    const cartItem: CartItem = { productId: product.id, productName: product.title, price: product.price, quantity: 1 };

    const cartItems = this.cartItemsSubject.value;
    const existingItemIndex = cartItems.findIndex(item => item.productId === cartItem.productId);
    if (existingItemIndex >= 0) {
      const existingItem = cartItems[existingItemIndex];
      const updatedItem = { ...existingItem, quantity: existingItem.quantity + cartItem.quantity };
      cartItems[existingItemIndex] = updatedItem;
    } else {
      cartItems.push(cartItem);
    }
    this.saveCartItems(cartItems);
  }

  public removeItemFromCart(productId: number): void {
    const cartItems = this.cartItemsSubject.value;
    const updatedItems = cartItems.filter(item => item.productId !== productId);
    this.saveCartItems(updatedItems);
  }

  public clearCart(): void {
    this.saveCartItems([]);
  }

  public getTotalCost(): number {
    return this.cartItemsSubject.value.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}
