import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./header/header.component";
import { LoginComponent } from "./login/login.component";
import { MovieComponent } from "./movie/movie.component";

const route : Routes = [
  {path: '', redirectTo:'login', pathMatch:'full'},
  {path: 'header', component: HeaderComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'movie/:type/:id', component: MovieComponent},
  {path:'**', component: LoginComponent}

];
@NgModule({
imports: [RouterModule.forRoot(route)],
exports: [RouterModule]
})

export class AppRoutingModule {

}
