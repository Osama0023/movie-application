import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckoutService } from '../checkout/checkout.service';

@Component({
  selector: 'app-complete-order',
  templateUrl: './complete-order.component.html',
  styleUrl: './complete-order.component.scss'
})
export class CompleteOrderComponent implements OnInit{
  order: any = null;

  constructor(private checkoutService: CheckoutService){}

  ngOnInit(): void {
    this.order = this.checkoutService.getOrder();  // Retrieve order data
  }

}
