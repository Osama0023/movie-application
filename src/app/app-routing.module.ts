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
  // Add breadcrumb data to other routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 