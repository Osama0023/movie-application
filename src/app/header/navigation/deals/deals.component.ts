import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductService } from '../../../all-product/all-product.service';
import { Product } from '../../../all-product/all-product.module';
import { SharedService } from '../../../shared/shared.service';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrl: './deals.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class DealsComponent implements OnInit {
  deals: Product[] = [];
  showNotification: boolean = false;

  constructor(
    private productService: ProductService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDeals();
  }

  loadDeals(): void {
    this.productService.getAllProducts().subscribe((products: Product[]) => {
      this.deals = products.filter(product => product.sale);
    });
  }

  addToCart(product: Product): void {
    const added = this.sharedService.addToCart({ item: product, quantity: 1 });
    if (!added) {
      this.showNotification = true;
      setTimeout(() => {
        this.showNotification = false;
      }, 2000);
    }
  }

  navigateToProductDetails(productId: string): void {
    this.router.navigate(['/product', productId]);
  }
}
