import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../all-product.module';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Access product data from navigation state
    const navigation = this.router.getCurrentNavigation();
    this.product = navigation?.extras.state?.product || null;
    console.log(this.product)
    if (!this.product) {
      // Redirect or handle case where product data isn't available
      console.warn('Product data not available');
    }
  }

  
}
