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

    constructor(
      private sharedService: SharedService,
      private router: Router
    ) {}

    ngOnInit(): void {}

    navigateToDetails() {
      this.router.navigate(['/product', this.data._id], {
        state: { product: this.data }
      });
    }

    toggleIcon(event: Event, type: 'cart' | 'wishlist') {
      event.stopPropagation();
      const element = event.target as HTMLElement;
  
      if (type === 'wishlist') {
        if (this.sharedService.isItemInWishlist(this.data._id)) {
          element.classList.remove('clicked');
          this.sharedService.removeFromWishlist(this.data._id);
        } else {
          element.classList.add('clicked');
          this.sharedService.addToWishlist(this.data);
        }
      }
      if (type === 'cart') {
        if (this.sharedService.isItemInCart(this.data._id)) {
          element.classList.add('clicked');
        }
      }
    }

    add(event?: Event) {
      if (event) {
        event.stopPropagation();
      }
      this.item.emit({ item: this.data, quantity: this.quantity });
    }
  }
