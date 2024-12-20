import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./header/header.component";
import { AuthComponent } from "./login/login.component";
import { CartComponent } from "./header/search-bar/cart/cart.component";
import { WishingListComponent } from "./header/search-bar/wishing-list/wishing-list.component";
import { ContactComponent } from "./header/nav-links/contact/contact.component";
import { LocationsComponent } from "./header/nav-links/locations/locations.component";
import { RouterModule, Routes } from "@angular/router";
import { CatogoryDashboardComponent } from "./Admin-dasboard/admin-dashbaord/category/cateogry-dashbaord.component";
import { AllProductComponent } from "./all-product/all-product.component";
import { ProductDetailsComponent } from "./all-product/product-details/product-details.component";
import { MostPopularComponent } from "./header/navigation/most-popular/most-popular.component";
import { DiscountComponent } from "./header/navigation/discount/discount.component";
import { DealsComponent } from "./header/navigation/deals/deals.component";
import { NewArrivalComponent } from "./header/navigation/new-arrival/new-arrival.component";
import { CheckoutComponent } from "./header/search-bar/cart/checkout/checkout.component";
import { CompleteOrderComponent } from "./header/search-bar/cart/complete-order/complete-order.component";
import { StoreLocationComponent } from "./header/search-bar/cart/store-location/store-location.component";
import { MyAccountPageComponent } from "./header/search-bar/my-account-page/my-account-page.component";

const route : Routes = [
  {path: '', redirectTo:'home', pathMatch:'full'},
  {path: 'header', component: HeaderComponent},
  { path: 'home/:category', component: HomeComponent },
  {path: 'home', component: HomeComponent},
  {path: 'login', component: AuthComponent},
  {path: 'cart', component: CartComponent},
  {path: 'wishlist' , component: WishingListComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'location', component: StoreLocationComponent},
  {path: 'new-arrival' , component: NewArrivalComponent},
  {path: 'deals', component: DealsComponent},
  {path: 'sale', component: DiscountComponent},
  {path: 'most-popular', component: MostPopularComponent},
  {path: 'admin-dashboard' , component: CatogoryDashboardComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'complete-order', component: CompleteOrderComponent},
  {
    path: 'product/:id',
    component: ProductDetailsComponent,
    data: { breadcrumb: 'Product Details' }
  },
  {
    path: 'my-account',
    component: MyAccountPageComponent,
  },
  // { path: 'product-details', component: ProductDetailsComponent }, // Route to product details page
  {path:'**', component: AuthComponent},

];
@NgModule({
imports: [RouterModule.forRoot(route)],
exports: [RouterModule]
})

export class AppRoutingModule {

}
