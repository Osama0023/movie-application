  import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
  import { Product } from '../all-product.module';
  import { SharedService } from '../../shared/shared.service';
  import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';

  @Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss',
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
  export class ProductComponent implements OnInit {
    @Input() data!: Product;
    @Output() item = new EventEmitter();
    quantity: number = 1;
    @Output() productSelected = new EventEmitter<Product>();

    constructor(
      private sharedService: SharedService,
      private router: Router // Inject Router
      ) {}

    ngOnInit(): void {}

    toggleIcon(event: any, type: 'cart' | 'wishlist') {
      const element = event.target;
  
      if (type === 'wishlist') {
        // If the item is already in wishlist, remove it
        if (this.sharedService.isItemInWishlist(this.data._id)) {
          element.classList.remove('clicked');
          this.sharedService.removeFromWishlist(this.data._id);
        } else {
          // If the item is not in wishlist, add it
          element.classList.add('clicked');
          this.sharedService.addToWishlist(this.data);
        }
      }
      if (type === 'cart') {
        // If the item is already in wishlist, remove it
        if (this.sharedService.isItemInCart(this.data._id)) {
          element.classList.add('clicked');
        }  
      }

    }
    navigateToDetails() {
      this.productSelected.emit(this.data);
    }
  
    add() {
      this.item.emit({ item: this.data, quantity: this.quantity });
          // Navigate to product details page using the product name
    // const productName = this.data.name.replace(/\s+/g, '-').toLowerCase(); // Replace spaces with hyphens and make it lowercase
    // this.router.navigate([`/home/${productName}`]); // Navigate to the product details page

    }
  }
