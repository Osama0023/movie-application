// import { HttpClient } from "@angular/common/http";
// import { Injectable, computed, signal } from "@angular/core";
// import { CartItem } from "./cart.model";
// import { Product } from "../all-product/all-product.module";


// @Injectable({providedIn: 'root'})

// export class CartServise {
    
//     constructor(){}
//     //mange state with signals
//     cartItems = signal<Product[]>([]);
//     //total up the extended price for each 
//     subTotal = computed(() => this.cartItems().reduce((a,b) => 
//         a + (b.quantity * Number(b.price)) ,0))
  
//     //delivery is free if spending more than 100000 credits
//     deliveryFree = computed(() => this.subTotal() < 100000 ? 900 : 0)

//     totalPrice = computed(() => this.subTotal()  + this.deliveryFree())

//     //addTo cart 
//     addToCart(product: Product) {
//         this.cartItems.set([...this.cartItems(), { product, quantity: 1 }]);
//       }
// }
