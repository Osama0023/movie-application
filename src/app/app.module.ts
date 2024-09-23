import { NgbModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing-model';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeatureModule } from './feature/feature.module';
import { ContactComponent } from './contact/contact.component';
import { AllProductComponent } from './all-product/all-product.component';
import { WishingListComponent } from './wishing-list/wishing-list.component';
import { MyAccountPageComponent } from './my-account-page/my-account-page.component';
import { DiscountComponent } from './discount/discount.component';
import { DealsComponent } from './deals/deals.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { NewProductComponent } from './new-product/new-product.component';
import { OurPolicyComponent } from './our-policy/our-policy.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SharedComponent } from './shared/shared.component';
import { FilterProductsComponent } from './filter-products/filter-products.component';
import { FooterComponent } from './footer/footer.component';
import { PaginationComponent } from './pagination/pagination.component';
import { LocationsComponent } from './locations/locations.component';
import { RegisterComponent } from './register/register.component';
import { MapLocationComponent } from './map-location/map-location.component';
import { CarrousalComponent } from './carrousal/carrousal.component';
import { AdminDashbaordComponent } from './Admin-dasboard/admin-dashbaord/admin-dashbaord.component'
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    HeaderComponent,
    ContactComponent,
    AllProductComponent,
    WishingListComponent,
    MyAccountPageComponent,
    DiscountComponent,
    DealsComponent,
    FeedbackComponent,
    AboutUsComponent,
    NewProductComponent,
    OurPolicyComponent,
    MyOrdersComponent,
    CartComponent,
    CheckoutComponent,
    ProductDetailsComponent,
    SharedComponent,
    FilterProductsComponent,
    FooterComponent,
    PaginationComponent,
    LocationsComponent,
    RegisterComponent,
    MapLocationComponent,
    CarrousalComponent,
    AdminDashbaordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FeatureModule,
    MatInputModule,      // Import MatInputModule
    MatFormFieldModule,
    MatDialogModule,
    AgGridModule,
    MatSelectModule,
    ReactiveFormsModule 

  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
