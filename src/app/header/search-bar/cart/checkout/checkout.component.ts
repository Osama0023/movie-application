import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartItem } from '../cart.model';
import { CheckoutService } from './checkout.service';
import { Router } from '@angular/router';
import { SharedService } from '../../../../shared/shared.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  total: number = 0;
  items: number = 0;
  savings: number = 0;
  cartProduct: CartItem[] = [];
  submitted = false;

  constructor(
    private checkoutService: CheckoutService, 
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.getCartProducts();
  }

  checkoutForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('^[a-zA-Z ]*$')
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('^[a-zA-Z ]*$')
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{11}$')
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ]),
    city: new FormControl('', Validators.required),
    country: new FormControl('Egypt'),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
    ]),
  });

  // Getter methods for form controls
  get f() { return this.checkoutForm.controls; }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.checkoutForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched || this.submitted)) : false;
  }

  getErrorMessage(fieldName: string): string {
    const control = this.checkoutForm.get(fieldName);
    if (control?.errors) {
      if (control.errors['required']) return `${fieldName} is required`;
      if (control.errors['minlength']) return `${fieldName} must be at least ${control.errors['minlength'].requiredLength} characters`;
      if (control.errors['pattern']) {
        switch(fieldName) {
          case 'email': return 'Please enter a valid email address';
          case 'firstName':
          case 'lastName': return 'Only letters are allowed';
          case 'phone': return 'Please enter a valid 11-digit phone number';
          default: return 'Invalid format';
        }
      }
    }
    return '';
  }

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
  this.submitted = true;

  if (this.checkoutForm.invalid) {
    Object.keys(this.checkoutForm.controls).forEach(key => {
      const control = this.checkoutForm.get(key);
      if (control?.invalid) {
        control.markAsTouched();
      }
    });
    return;
  }

  const order = {
    items: this.cartProduct.map(item => ({
      product: item.item._id,
      quantity: item.quantity,
      colors: item.selectedColor
    })),
    totalPrice: this.total,
    address: this.checkoutForm.get('address')?.value,
    email: this.checkoutForm.get('email')?.value,
    name: `${this.checkoutForm.get('firstName')?.value} ${this.checkoutForm.get('lastName')?.value}`,
    // status: ''
  };
console.log('ssssss',order)
  this.checkoutService.createOrder(order).subscribe({
    next: (response) => {
      console.log('Order created successfully', response);
      this.checkoutService.setOrder({
        ...order,
        orderNumber: response.orderNumber
      });

      // Clear cart from localStorage
      localStorage.removeItem('cart');
      
      // Update cart count in header using the shared service
      this.sharedService.updateCartCountFromLocalStorage();
      
      // Reset local cart data
      this.cartProduct = [];
      this.total = 0;
      this.items = 0;
      this.savings = 0;

      // Navigate to complete-order page
      this.router.navigate(['/complete-order']);
    },
    error: (error) => {
      console.error('Error creating order', error);
    }
  });
}
}
