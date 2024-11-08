import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  cartProduct:any[] = [];
  total:any =0;
  success:boolean = false

  ngOnInit(): void {
    this.getCartProducts()
  }

  getCartProducts(){
    if("cart" in localStorage){
      this.cartProduct = JSON.parse(localStorage.getItem("cart")!);
      console.log('cartProduct',this.cartProduct)
  }
  this.getCartTotal();  
}
getCartTotal(){
 this.total =0;
for(let x in this.cartProduct){
  console.log(this.cartProduct[x].item.price)
  console.log(this.cartProduct[x].item.sale.discountPercentage / 100)
  console.log(this.cartProduct[x].quantity)

  this.total += 
  (this.cartProduct[x].item.price -((this.cartProduct[x].item.price * this.cartProduct[x].item.sale.discountPercentage / 100 ))) 
   * this.cartProduct[x].quantity 
}
}

// getproductPrice(){
//   this.total =0;
//  for(let x in this.cartProduct){
//    this.total += this.cartProduct[x].item.price * this.cartProduct[x].quantity 
//  }
//  }
 
minsAmount(index: number) {
  if (this.cartProduct[index].quantity <= 1) {
    // If the quantity is less than or equal to 1, delete the product
    this.deleteProduct(index);
  } else {
    // Otherwise, decrease the quantity
    this.cartProduct[index].quantity--;
    this.getCartTotal();  
    localStorage.setItem("cart", JSON.stringify(this.cartProduct));    
  }
}
addAmount(index: number){
this.cartProduct[index].quantity++ ;
this.getCartTotal();  
localStorage.setItem("cart", JSON.stringify(this.cartProduct))  
}
detectChange(){
  this.getCartTotal();  
  localStorage.setItem("cart", JSON.stringify(this.cartProduct))  
}
deleteProduct(index: number){
  this.cartProduct.splice(index , 1);
  this.getCartTotal();  
  localStorage.setItem("cart", JSON.stringify(this.cartProduct))  
}
clearCart(){
  this.cartProduct = [];
  this.getCartTotal(); 
  localStorage.setItem("cart", JSON.stringify(this.cartProduct))  
  
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
