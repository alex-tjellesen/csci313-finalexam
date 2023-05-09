import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem } from './cart-item';
import { Order } from './order';
import { AuthStateService } from '../auth/auth-state.service';
import { Router } from '@angular/router';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersRef = this.db.list<Order>('orders');

  constructor(
    private db: AngularFireDatabase, 
    private authStateService: AuthStateService,
    private router: Router,
    private cartService: CartService) {}

  public order(items: CartItem[], totalCost: number): void {
    if(this.authStateService.isLoggedIn){
      const id = this.db.createPushId(); 
      const order: Order = {
        orderId: id,
        userId: this.authStateService.getUser().id,
        items: items,
        totalCost: totalCost,
        date: new Date().toUTCString(),
      };
      this.ordersRef.push(order);
      this.cartService.clearCart(); 
      this.router.navigate(['/orders']); 
    }else{
      this.router.navigate(['/login']);
    }    
  }

  getOrders(): Observable<Order[]> {
    return this.db.list<Order>('orders', ref => ref.orderByChild('userId').equalTo(this.authStateService.getUser().id)).valueChanges()
      .pipe(
        map(orders => {
          return orders
        })
      );
  }
}
