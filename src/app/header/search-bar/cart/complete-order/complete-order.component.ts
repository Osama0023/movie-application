import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckoutService } from '../checkout/checkout.service';

@Component({
  selector: 'app-complete-order',
  templateUrl: './complete-order.component.html',
  styleUrls: ['./complete-order.component.scss']
})
export class CompleteOrderComponent implements OnInit {
  orderDetails: any;

  constructor(
    private checkoutService: CheckoutService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.orderDetails = this.checkoutService.getOrder();
    if (!this.orderDetails) {
      this.router.navigate(['/cart']);
    }
  }

  backToShopping() {
    // Clear cart from localStorage
    localStorage.removeItem('cart');
    // Clear order data
    this.checkoutService.clearOrder();
    // Navigate to home or shop page
    this.router.navigate(['/']);
  }
}
