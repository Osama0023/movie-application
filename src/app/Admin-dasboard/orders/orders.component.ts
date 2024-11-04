import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from './order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.http.get<any>('http://localhost:3000/api/orders/all')
      .subscribe(response => {
        console.log('API Response:', response);
        
        // Ensure we are accessing the 'data' array in the response
        this.orders = Array.isArray(response.data) ? response.data : [];
        
        if (!Array.isArray(this.orders)) {
          console.error('Expected an array of orders in response.data but got:', this.orders);
          this.orders = []; // reset to empty array if structure is incorrect
        }
      });
  }
  
  // updateOrderStatus(order: Order): void {
  //   this.http.put(`http://localhost:3000/api/orders/${order.name}`, { status: order.status })
  //     .subscribe(response => {
  //       console.log(`Order ${order.name} updated to ${order.status}`);
  //     });
  // }
}
