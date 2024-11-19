import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { Product } from '../../../all-product/all-product.module'; 

@Component({
  selector: 'app-wishing-list',
  templateUrl: './wishing-list.component.html',
  styleUrls: ['./wishing-list.component.scss']
})
export class WishingListComponent implements OnInit {
  wishlistItems: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 8;
  pagedItems: any[] = [];

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
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

  addToCart(item: any) {
    // Implement add to cart logic
  }

  removeFromWishlist(item: any) {
    this.sharedService.removeFromWishlist(item.id);
    this.wishlistItems = this.sharedService.getWishlistItems(); // Refresh the wishlist items
    this.updatePagedItems();
  }
}
