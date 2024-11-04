import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { Product } from '../all-product.module';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  product!: Product;
  productName!: string;

  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productName = params.get('productName') || '';
      // Fetch the product details by productName, you can replace this with your actual fetching logic
    });
  }

}
