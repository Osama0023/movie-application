import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  cartProduct:any[] = [];
  total:any =0;
  success:boolean = false

  constructor(
    private sharedService: SharedService,
    @Inject(PLATFORM_ID) private platformId: Object
  ){}
  ngOnInit(): void {
    this.getCartProducts()
  }

  getCartProducts(): void {
    if (isPlatformBrowser(this.platformId)) {
      const cartData = localStorage.getItem('cart');
      if (cartData) {
        this.cartProduct = JSON.parse(cartData);
        this.calculateTotal();
      }
    }
  }

  calculateTotal() {
    this.total = 0;
    for (let x in this.cartProduct) {
      console.log(this.cartProduct[x].item.price)
      console.log(this.cartProduct[x].item.sale.discountPercentage / 100)
      console.log(this.cartProduct[x].quantity)

      this.total += 
      (this.cartProduct[x].item.price -((this.cartProduct[x].item.price * this.cartProduct[x].item.sale.discountPercentage / 100 ))) 
       * this.cartProduct[x].quantity 
    }
  }

  minsAmount(index: number) {
    if (this.cartProduct[index].quantity <= 1) {
      // If the quantity is less than or equal to 1, delete the product
      this.deleteProduct(index);
    } else {
      // Otherwise, decrease the quantity
      this.cartProduct[index].quantity--;
      this.calculateTotal();  
      localStorage.setItem("cart", JSON.stringify(this.cartProduct));
      // Update the cart count in SharedService
      this.sharedService.updateCartCountFromLocalStorage();
    }
  }
  addAmount(index: number){
    this.cartProduct[index].quantity++ ;
    this.calculateTotal();  
    localStorage.setItem("cart", JSON.stringify(this.cartProduct))  
  }
  detectChange(){
    this.calculateTotal();  
    localStorage.setItem("cart", JSON.stringify(this.cartProduct))  
  }
  deleteProduct(index: number){
    this.cartProduct.splice(index , 1);
    this.calculateTotal();  
    localStorage.setItem("cart", JSON.stringify(this.cartProduct));
    // Update the cart count in SharedService
    this.sharedService.updateCartCountFromLocalStorage();
  }
  clearCart(){
    this.cartProduct = [];
    this.calculateTotal(); 
    localStorage.setItem("cart", JSON.stringify(this.cartProduct));
    // Update the cart count in SharedService
    this.sharedService.updateCartCountFromLocalStorage();
  }
  addCart(){
    let products = this.cartProduct.map(item => {
     return {productId : item.item.id , quantity: item.quantity }
    })
    const model = {
      userId : 5,
      date: new Date(),
      products: products
    }
    // this.cartService.createNewCart(model).subscribe(res =>{
    //   this.success = true
    // })
    console.log(model)
  }
}
