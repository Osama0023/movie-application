import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from './order.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  currentStatus: string = 'all';
  orderStatuses = ['pending','ordered', 'prepared', 'shipped', 'delivered'];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.http.get<any>('http://localhost:3000/api/orders/all')
      .subscribe(response => {
        console.log('response',response)
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
    Swal.fire({
      title: 'Update Order Status',
      text: `Are you sure you want to change the order status to "${newStatus}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'No, cancel',
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#ef4444',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('order._id',order._id);
        console.log('newStatus',newStatus);
        console.log('orderstatus',order.status);
        this.http.patch(`http://localhost:3000/api/orders/${order._id}/status`, { 
          status: newStatus 
        }).subscribe({
          next: () => {
            order.status = newStatus;

            this.filterByStatus(this.currentStatus);
            Swal.fire({
              title: 'Updated!',
              text: 'Order status has been updated successfully.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            });
          },
          error: (error) => {
            console.error('Error updating order status:', error);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to update order status.',
              icon: 'error',
              confirmButtonColor: '#3b82f6'
            });
          }
        });
      } else {
        const selectElement = document.querySelector(`select[data-order-id="${order._id}"]`) as HTMLSelectElement;
        if (selectElement) {
          selectElement.value = order.status;
        }
      }
    });
  }
}
