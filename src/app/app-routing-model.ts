import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./header/header.component";
import { AuthComponent } from "./login/login.component";
import { CartComponent } from "./cart/cart.component";
import { WishingListComponent } from "./wishing-list/wishing-list.component";
import { ContactComponent } from "./contact/contact.component";
import { LocationsComponent } from "./locations/locations.component";

const route : Routes = [
  {path: '', redirectTo:'home', pathMatch:'full'},
  {path: 'header', component: HeaderComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: AuthComponent},
  {path: 'cart', component: CartComponent},
  {path: 'wishlist' , component: WishingListComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'location', component: LocationsComponent},

  {path:'**', component: HomeComponent},

];
@NgModule({
imports: [RouterModule.forRoot(route)],
exports: [RouterModule]
})

export class AppRoutingModule {

}
