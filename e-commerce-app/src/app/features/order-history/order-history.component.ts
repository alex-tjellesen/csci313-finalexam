import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/core/data/order';
import { OrderService } from 'src/app/core/data/order.service';


@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit{
  orders: Order[] = [];
  displayedColumns: string[] = ['id', 'cost', 'items', 'date'];
  
  constructor(private orderService: OrderService){}

  ngOnInit(): void {
      this.orderService.getOrders().subscribe(o => {
        this.orders = o;
      })
  }
}