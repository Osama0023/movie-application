import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { Product } from '../../../all-product/all-product.module'; 

@Component({
  selector: 'app-wishing-list',
  templateUrl: './wishing-list.component.html',
  styleUrl: './wishing-list.component.scss'
})
export class WishingListComponent implements OnInit {
  wishlistItems: Product[] = [];

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.wishlistItems = this.sharedService.getWishlistItems();
  }

  removeFromWishlist(itemId: string) {
    this.sharedService.removeFromWishlist(itemId);
    this.wishlistItems = this.sharedService.getWishlistItems(); // Refresh the wishlist items
  }
}
