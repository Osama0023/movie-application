import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../login/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  cartProduct:any[] = [];
  total:any =0;
  success:boolean = false
  errorMessage: string = '';
  showError: boolean = false;
  canPurchase: boolean = false;
  purchaseErrorMessage: string = '';

  constructor(
    private sharedService: SharedService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private authService: AuthService
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
    this.canPurchase = this.total > 0;
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
    const item = this.cartProduct[index];
    const selectedColor = item.selectedColor;
    
    // Find the color object from the product's colors array
    const colorInfo = item.item.colors.find((c: any) => c.colorName === selectedColor);
    
    if (!colorInfo) {
      this.showErrorMessage('Please select a color first');
      return;
    }

    if (item.quantity >= colorInfo.quantity) {
      this.showErrorMessage(`Only ${colorInfo.quantity} items available in ${selectedColor} at Embabi Store`);
      return;
    }

    item.quantity++;
    this.calculateTotal();
    localStorage.setItem("cart", JSON.stringify(this.cartProduct));
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

  updateColor(index: number, color: string) {
    const item = this.cartProduct[index];
    const colorInfo = item.item.colors.find((c: any) => c.colorName === color);
    
    if (!colorInfo || colorInfo.quantity === 0) {
      this.showErrorMessage(`${color} is out of stock. Please select a different color.`);
      return;
    }

    if (item.quantity > colorInfo.quantity) {
      item.quantity = colorInfo.quantity;
      this.showErrorMessage(`Quantity adjusted to ${colorInfo.quantity} (maximum available in ${color})`);
    }
    
    item.selectedColor = color;
    item.needsColor = false;
    localStorage.setItem("cart", JSON.stringify(this.cartProduct));
    this.calculateTotal();

    if (this.errorMessage.includes('select a color')) {
      this.showError = false;
      this.errorMessage = '';
    }
  }

  private showErrorMessage(message: string) {
    this.errorMessage = message;
    this.showError = true;
    setTimeout(() => {
      this.showError = false;
      this.errorMessage = '';
    }, 3000);
  }

  checkout() {
    if (!this.canPurchase) {
      this.showErrorMessage('Cannot proceed with empty cart. Please add items to your cart.');
      return;
    }

    // Check if all items have selected colors
    const itemsWithoutColor = this.cartProduct.filter(item => !item.selectedColor);
    if (itemsWithoutColor.length > 0) {
      this.showErrorMessage('Please select a color for all items before checkout');
      
      itemsWithoutColor.forEach(item => {
        const index = this.cartProduct.indexOf(item);
        if (index >= 0) {
          this.cartProduct[index].needsColor = true;
        }
      });
      return;
    }

    // Check if any selected color has zero quantity
    const itemsWithZeroQuantity = this.cartProduct.filter(item => {
      const selectedColorInfo = item.item.colors.find((c: any) => c.colorName === item.selectedColor);
      return selectedColorInfo && selectedColorInfo.quantity === 0;
    });

    if (itemsWithZeroQuantity.length > 0) {
      this.showErrorMessage('Some selected colors are out of stock. Please choose a different color.');
      
      itemsWithZeroQuantity.forEach(item => {
        const index = this.cartProduct.indexOf(item);
        if (index >= 0) {
          this.cartProduct[index].needsColor = true;
        }
      });
      return;
    }

    // Check if user is logged in
    if (!this.authService.isAuthenticated()) {
      // Store the intended destination
      this.authService.setRedirectUrl('/checkout');
      
      // Show message and redirect to login
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 0);
      return;
    }

    // If all validations pass and user is logged in, proceed to checkout
    this.router.navigate(['/checkout']);
  }
}
