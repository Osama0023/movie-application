import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../header/search-bar/cart/cart.model';
import { WishlistItem } from '../header/search-bar/wishing-list/whiahing-list.model';
import { Product } from '../all-product/all-product.module';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private cartCountSource = new BehaviorSubject<number>(0);
  private wishlistCountSource = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSource.asObservable();
  wishlistCount$ = this.wishlistCountSource.asObservable();
  private selectedCategorySource = new BehaviorSubject<string | null>(null);
  selectedCategory$ = this.selectedCategorySource.asObservable();

  constructor() {
    this.updateCartCountFromLocalStorage(); // Sync cart count on service initialization
    this.updateWishlistCountFromLocalStorage(); // Sync wishlist count on service initialization
  }

  // Check if localStorage is available (useful for SSR environments)
  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__localStorageTest__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  // Sync cart count with items in localStorage
   updateCartCountFromLocalStorage() {
    if (this.isLocalStorageAvailable()) {
      const cartItems: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
      this.cartCountSource.next(cartItems.length);
    } else {
      this.cartCountSource.next(0); // Fallback if localStorage is not available
    }
  }

  // Sync wishlist count with items in localStorage
  private updateWishlistCountFromLocalStorage() {
    if (this.isLocalStorageAvailable()) {
      const wishlistItems: Product[] = JSON.parse(localStorage.getItem('wishlist') || '[]');
      this.wishlistCountSource.next(wishlistItems.length);
    } else {
      this.wishlistCountSource.next(0); // Fallback if localStorage is not available
    }
  }

  // Update selected category
  setSelectedCategory(categoryId: string) {
    this.selectedCategorySource.next(categoryId);
  }

  // Add item to wishlist and handle localStorage
  addToWishlist(item: Product): void {
    if (this.isLocalStorageAvailable()) {
      let wishlistItems: Product[] = JSON.parse(localStorage.getItem('wishlist') || '[]');
  
      if (!wishlistItems.find(wishlistItem => wishlistItem._id === item._id)) {
        wishlistItems.push(item);
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
        this.updateWishlistCountFromLocalStorage(); // Update wishlist count
      }
    }
  }

  // Remove an item from wishlist
  removeFromWishlist(itemId: string): void {
    if (this.isLocalStorageAvailable()) {
      let wishlistItems: Product[] = JSON.parse(localStorage.getItem('wishlist') || '[]');
      wishlistItems = wishlistItems.filter(wishlistItem => wishlistItem._id !== itemId);
      localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
      this.updateWishlistCountFromLocalStorage(); // Update wishlist count
    }
  }

  // Get all items from wishlist
  getWishlistItems(): Product[] {
    if (this.isLocalStorageAvailable()) {
      return JSON.parse(localStorage.getItem('wishlist') || '[]');
    }
    return []; // Fallback if localStorage is not available
  }

  // Check if an item exists in wishlist
  isItemInWishlist(itemId: string): boolean {
    if (this.isLocalStorageAvailable()) {
      let wishlistItems: Product[] = JSON.parse(localStorage.getItem('wishlist') || '[]');
      return wishlistItems.some(wishlistItem => wishlistItem._id === itemId);
    }
    return false; // Fallback if localStorage is not available
  }

  // Add item to cart and handle localStorage
  addToCart(item: CartItem): boolean {
    if (this.isLocalStorageAvailable()) {
      let cartItems: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
  
      let exist = cartItems.find(cartItem => cartItem.item._id === item.item._id);
      if (exist) {
        // Item already exists in cart
        return false;
      }
  
      cartItems.push(item);
      localStorage.setItem('cart', JSON.stringify(cartItems));
      this.updateCartCountFromLocalStorage(); // Update cart count
      return true;
    }
    return false; // Fallback if localStorage is not available
  }

  // Remove an item from cart
  removeFromCart(itemId: string) {
    if (this.isLocalStorageAvailable()) {
      let cartItems: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
      cartItems = cartItems.filter(cartItem => cartItem.item._id !== itemId);
      localStorage.setItem('cart', JSON.stringify(cartItems));
      this.updateCartCountFromLocalStorage(); // Update cart count
    }
  }

  // Check if an item exists in the cart
  isItemInCart(itemId: string): boolean {
    if (this.isLocalStorageAvailable()) {
      let cartItems: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
      return cartItems.some(cartItem => cartItem.item._id === itemId);
    }
    return false; // Fallback if localStorage is not available
  }

  // Increment wishlist count
  incrementWishlistCount() {
    const currentCount = this.wishlistCountSource.value;
    this.wishlistCountSource.next(currentCount + 1);
  }

  // Decrement wishlist count
  decrementWishlistCount() {
    const currentCount = this.wishlistCountSource.value;
    this.wishlistCountSource.next(currentCount > 0 ? currentCount - 1 : 0);
  }
}
