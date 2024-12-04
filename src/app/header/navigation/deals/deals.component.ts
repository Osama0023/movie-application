import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../all-product/all-product.service';
import { Product } from '../../../all-product/all-product.module';
import { SharedService } from '../../../shared/shared.service';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { CartItem } from '../../search-bar/cart/cart.model';

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
  notificationMessage: string = '';

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
      this.deals = products.filter(product => product.sale.discountPercentage > 0);
    });
  }

  addToCart(product: Product): void {
    // Check if product is already in cart
    const cartData = localStorage.getItem('cart');
    const cartItems: CartItem[] = cartData ? JSON.parse(cartData) : [];
    
    const existingCartItem = cartItems.find(item => item.item._id === product._id);
    
    if (existingCartItem) {
      this.showNotificationMessage(' Item is already in the cart!');
      return;
    }

    // Create new cart item
    const cartItem: CartItem = {
      item: product,
      quantity: 1
    };

    // Add to cart
    cartItems.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // Update cart count
    this.sharedService.updateCartCountFromLocalStorage();
    
    this.showNotificationMessage('Item added to cart successfully');
  }

  private showNotificationMessage(message: string): void {
    this.notificationMessage = message;
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
      this.notificationMessage = '';
    }, 2000);
  }

  navigateToProductDetails(productId: string): void {
    this.router.navigate(['/product', productId]);
  }
}
