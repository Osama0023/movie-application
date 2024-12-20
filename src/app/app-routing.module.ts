import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AllProductComponent } from './all-product/all-product.component';
import { CompleteOrderComponent } from './header/search-bar/cart/complete-order/complete-order.component';
import { ProductDetailsComponent } from './all-product/product-details/product-details.component';
import { MyAccountPageComponent } from './header/search-bar/my-account-page/my-account-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { breadcrumb: 'Home' }
  },
  {
    path: 'home/:category',
    component: AllProductComponent,
    data: { breadcrumb: 'Products' }
  },
  { path: 'complete-order', component: CompleteOrderComponent },
  {
    path: 'my-account',
    component: MyAccountPageComponent,
  },
  
  // Add breadcrumb data to other routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 