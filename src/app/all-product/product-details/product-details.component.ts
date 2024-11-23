import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../all-product.module';
import { ProductService } from '../all-product.service';
import { SharedService } from '../../shared/shared.service';
import { CartItem } from '../../header/search-bar/cart/cart.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  selectedQuantity: number = 1;
  selectedColor: string | null = null;
  showNotification: boolean = false;
  isInWishlist: boolean = false;
  loading: boolean = true;
  error: string | null = null;
  selectedImage: string = 'assets/images/mobile-iphone.jpg';
  activeThumbIndex: number = 0;
  allImages: string[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    // Try to get product from navigation state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state?.['product']) {
      this.product = navigation.extras.state?.['product'];
      this.initializeProduct();
    } else {
      // If no state, get product ID from URL and fetch product
      const productId = this.route.snapshot.paramMap.get('id');
      if (productId) {
        this.fetchProduct(productId);
      }
    }
  }

  private fetchProduct(productId: string) {
    this.loading = true;
    this.productService.getProductById(productId).subscribe({
      next: (product) => {
        this.product = product;
        this.initializeProduct();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching product:', error);
        this.error = 'Failed to load product details';
        this.loading = false;
      }
    });
  }

  private initializeProduct() {
    if (this.product) {
      this.isInWishlist = this.sharedService.isItemInWishlist(this.product._id);
      if (this.product.colors?.length > 0) {
        this.selectedColor = this.product.colors[0].colorName;
      }

      // Initialize images array with main image and thumbnails
      const mainImage = 'assets/images/mobile-iphone.jpg';
      this.allImages = [mainImage];
      
      if (this.product.thumbnails?.length) {
        this.allImages = [...this.allImages, ...Array(4).fill('assets/images/logo.png')];
      }
      
      this.selectedImage = this.allImages[0];
    }
  }

  increaseQuantity() {
    if (this.selectedQuantity < 10) {
      this.selectedQuantity++;
    }
  }

  decreaseQuantity() {
    if (this.selectedQuantity > 1) {
      this.selectedQuantity--;
    }
  }

  selectColor(colorName: string) {
    this.selectedColor = colorName;
  }

  addToCart() {
    if (this.product && this.selectedColor) {
      const cartItem: CartItem = {
        item: this.product,
        quantity: this.selectedQuantity
      };
      
      const added = this.sharedService.addToCart(cartItem);
      if (!added) {
        this.showNotification = true;
        setTimeout(() => {
          this.showNotification = false;
        }, 2000);
      }
    }
  }

  toggleWishlist() {
    if (!this.product) return;

    if (this.isInWishlist) {
      this.sharedService.removeFromWishlist(this.product._id);
    } else {
      this.sharedService.addToWishlist(this.product);
    }
    this.isInWishlist = !this.isInWishlist;
  }

  getDiscountedPrice(): number {
    if (!this.product) return 0;
    if (!this.product.sale?.discountPercentage) return this.product.price;
    
    return this.product.price - (this.product.price * (this.product.sale.discountPercentage / 100));
  }

  selectThumbnail(thumbnailSrc: string, index: number) {
    this.selectedImage = thumbnailSrc;
    this.activeThumbIndex = index;
  }
}
