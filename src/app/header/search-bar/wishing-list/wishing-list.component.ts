import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { Product } from '../../../all-product/all-product.module';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-wishing-list',
  templateUrl: './wishing-list.component.html',
  styleUrls: ['./wishing-list.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class WishingListComponent implements OnInit {
  wishlistItems: Product[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 8;
  pagedItems: Product[] = [];
  showNotification: boolean = false;
  notificationMessage: string = '';

  constructor(
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadWishlistItems();
  }

  loadWishlistItems() {
    this.wishlistItems = this.sharedService.getWishlistItems();
    this.updatePagedItems();
  }

  updatePagedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedItems = this.wishlistItems.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePagedItems();
  }

  addToCart(event: Event, item: Product) {
    event.stopPropagation();
    const cartItem = {
      item: item,
      quantity: 1
    };
    
    const added = this.sharedService.addToCart(cartItem);
    if (added) {
      this.showNotification = true;
      this.notificationMessage = 'Product added to cart successfully!';
      this.removeFromWishlist(event, item); // Remove from wishlist after adding to cart
      
      setTimeout(() => {
        this.showNotification = false;
      }, 3000);
    } else {
      this.showNotification = true;
      this.notificationMessage = 'Product is already in cart!';
      
      setTimeout(() => {
        this.showNotification = false;
      }, 3000);
    }
  }

  removeFromWishlist(event: Event, item: Product) {
    event.stopPropagation();
    this.sharedService.removeFromWishlist(item._id);
    this.loadWishlistItems();
  }

  navigateToDetails(item: Product) {
    this.router.navigate(['/product', item._id]);
  }
}
