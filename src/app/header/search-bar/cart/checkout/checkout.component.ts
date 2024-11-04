import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CartItem } from '../cart.model';
import { CheckoutService } from './checkout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  total : number=0
  items: number =0;
  savings: number =0
  cartProduct:CartItem[]=[];

  constructor(private checkoutService: CheckoutService , private router: Router){}
  ngOnInit(): void {
    this.getCartProducts()
  }

  checkoutForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    secNumber: new FormControl(''),
    country: new FormControl('Egypt'),
    email: new FormControl(''),

  });

  getCartProducts(){
    if("cart" in localStorage){
      this.cartProduct = JSON.parse(localStorage.getItem("cart")!);
      console.log('ddddd',this.cartProduct)
  }
  this.getCartTotal();  
}
getCartTotal(){
 this.total =0;
 this.items=0
for(let x in this.cartProduct){
  console.log(this.cartProduct[x].item.price)
  console.log(this.cartProduct[x].item.sale.discountPercentage / 100)
  console.log(this.cartProduct[x].quantity)
  this.items+=  this.cartProduct[x].quantity;
  this.savings+= (this.cartProduct[x].item.price * this.cartProduct[x].item.sale.discountPercentage / 100) *this.cartProduct[x].quantity
  this.total += 
  (this.cartProduct[x].item.price -((this.cartProduct[x].item.price * this.cartProduct[x].item.sale.discountPercentage / 100 ))) 
   * this.cartProduct[x].quantity 
}
}


Purchase() {
  const order = {
    items: this.cartProduct.map(item => ({
      product: item.item._id,  // Ensure item ID is correct
      quantity: item.quantity
    })),
    totalPrice: this.total,
    address: this.checkoutForm.get('address')?.value,
    email: this.checkoutForm.get('email')?.value,
    name: `${this.checkoutForm.get('firstName')?.value} ${this.checkoutForm.get('lastName')?.value}`
  };

  this.checkoutService.createOrder(order).subscribe(
    response => {
      console.log('Order created successfully', response);
      this.checkoutService.setOrder(order);  // Store order data in OrderService
      this.router.navigate(['/complete-order']);  // Navigate to complete-order
    },
    error => {
      console.error('Error creating order', error);
    }
  );
}}
