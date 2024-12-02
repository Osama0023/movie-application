import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

interface ApiResponse {
  status: string;
  data: Order[];
}

interface OrderItem {
  product: {
    name: string;
    price: number;
    sale: {
      discountPercentage: number;
      saleEndDate?: string;
    };
  };
  quantity: number;
  colors: string;
  _id: string;
}

interface Order {
  _id: string;
  orderId: number;
  items: OrderItem[];
  totalPrice: number;
  status: string;
  address: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  user: string;
}

@Component({
  selector: 'app-my-account-page',
  templateUrl: './my-account-page.component.html',
  styleUrls: ['./my-account-page.component.scss']
})
export class MyAccountPageComponent implements OnInit {
  userEmail: string = '';
  orders: Order[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.userEmail = localStorage.getItem('email') || '';
    this.fetchOrders();
  }

  fetchOrders() {
    this.http.get<ApiResponse>('http://localhost:3000/api/orders/myorders')
      .subscribe({
        next: (response) => {
          console.log('Orders response:', response);
          this.orders = response.data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching orders:', error);
          if (error.status === 401) {
            this.router.navigate(['/login']);
          }
          this.error = 'Failed to load orders. Please try again.';
          this.isLoading = false;
        }
      });
  }
}
