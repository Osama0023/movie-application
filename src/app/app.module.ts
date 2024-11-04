import { NgbModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing-model';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ContactComponent } from './header/nav-links/contact/contact.component';
import { AllProductComponent } from './all-product/all-product.component';
import { WishingListComponent } from './header/search-bar/wishing-list/wishing-list.component';
import { MyAccountPageComponent } from './header/search-bar/my-account-page/my-account-page.component';
import { DiscountComponent } from './header/navigation/discount/discount.component';
import { DealsComponent } from './header/navigation/deals/deals.component';
import { OurPolicyComponent } from './footer/our-policy/our-policy.component';
import { MyOrdersComponent } from './header/search-bar/my-orders/my-orders.component';
import { CartComponent } from './header/search-bar/cart/cart.component';
import { CheckoutComponent } from './header/search-bar/cart/checkout/checkout.component';
import { ProductDetailsComponent } from './all-product/product-details/product-details.component';
import { SharedComponent } from './shared/shared.component';
import { FilterProductsComponent } from './shared/filter-products/filter-products.component';
import { FooterComponent } from './footer/footer.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { LocationsComponent } from './header/nav-links/locations/locations.component';
import { RegisterComponent } from './login/register/register.component';
import { MapLocationComponent } from './map-location/map-location.component';
import { CarrousalComponent } from './shared/carrousal/carrousal.component';
import {  CatogoryDashboardComponent } from './Admin-dasboard/admin-dashbaord/category/cateogry-dashbaord.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AgGridModule } from 'ag-grid-angular';
import { MatInputModule } from '@angular/material/input';  // Required for matInput
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { HeaderComponent } from './header/header.component';
import { AuthInterceptorService } from './login/auth-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductDashboardComponent } from './Admin-dasboard/admin-dashbaord/product/product-dashboard/product-dashboard.component';
import { GridEditIconComponent } from './shared/grid-edit-icon/grid-edit-icon/grid-edit-icon.component';
import { NgxColorsModule } from 'ngx-colors';
import { ColorPickerModule } from 'ngx-color-picker';
import { ProductComponent } from './all-product/product/product.component';
import { ForgetpasswordComponent } from './login/forgetpassword/forgetpassword.component';
import { VerifyEmailComponent } from './login/verify-email/verify-email.component';
import { NavLinksComponent } from './header/nav-links/nav-links.component';
import { SearchBarComponent } from './header/search-bar/search-bar.component';
import { DepartmentsComponent } from './header/departments/departments.component';
import { NavigationComponent } from './header/navigation/navigation.component';
import { AboutUsComponent } from './footer/about-us/about-us.component';
import { FeedbackComponent } from './footer/feedback/feedback.component';
import { NewArrivalComponent } from './header/navigation/new-arrival/new-arrival.component';
import { MostPopularComponent } from './header/navigation/most-popular/most-popular.component';
import { LogoComponent } from './header/search-bar/logo/logo.component';
import { CompleteOrderComponent } from './header/search-bar/cart/complete-order/complete-order.component';
import { OrdersComponent } from './Admin-dasboard/orders/orders.component';
import { GoogleMapsModule } from '@angular/google-maps';

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
    CatogoryDashboardComponent,
    ProductDashboardComponent,
    GridEditIconComponent,
    ProductComponent,
    ForgetpasswordComponent,
    VerifyEmailComponent,
    NavLinksComponent,
    SearchBarComponent,
    DepartmentsComponent,
    NavigationComponent,
    NewArrivalComponent,
    MostPopularComponent,
    LogoComponent,
    CompleteOrderComponent,
    OrdersComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,      // Import MatInputModule
    MatFormFieldModule,
    MatDialogModule,
    AgGridModule,
    MatSelectModule,
    ReactiveFormsModule ,
    BrowserAnimationsModule,
    NgxColorsModule,
    ColorPickerModule,
    GoogleMapsModule
  ],
  providers: [provideHttpClient(withFetch()),
    {provide:  HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
 bootstrap: [AppComponent]
})
export class AppModule { }
