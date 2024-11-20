import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from './order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  currentStatus: string = 'all';
  orderStatuses = ['ordered', 'prepared', 'shipped', 'delivered'];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.http.get<any>('http://localhost:3000/api/orders/all')
      .subscribe(response => {
        this.orders = Array.isArray(response.data) ? response.data : [];
        this.filterByStatus('all');
      });
  }

  filterByStatus(status: string): void {
    this.currentStatus = status;
    this.filteredOrders = status === 'all' 
      ? this.orders 
      : this.orders.filter(order => order.status === status);
  }

  getOrdersCount(status: string): number {
    return status === 'all' 
      ? this.orders.length 
      : this.orders.filter(order => order.status === status).length;
  }

  getStatusIcon(status: string): string {
    const icons = {
      'ordered': 'fa-shopping-cart',
      'prepared': 'fa-box',
      'shipped': 'fa-shipping-fast',
      'delivered': 'fa-check-circle',
      'all': 'fa-list'
    };
    return icons[status] || 'fa-list';
  }

  updateOrderStatus(order: Order, newStatus: string): void {
    this.http.put(`http://localhost:3000/api/orders/${order._id}`, { 
      status: newStatus 
    }).subscribe({
      next: () => {
        order.status = newStatus;
        // Refresh the filtered orders
        this.filterByStatus(this.currentStatus);
      },
      error: (error) => {
        console.error('Error updating order status:', error);
        // Implement error handling UI feedback here
      }
    });
  }
}
