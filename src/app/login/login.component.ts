import { Component } from '@angular/core';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-auth',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading =false;
  isAdmin : string;
  error: string  =null;
  helper = new JwtHelperService();

  constructor(private authService: AuthService, private router : Router,   
  ){}
  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form: NgForm) {
    if(!form.valid){
      return
    }
    const email = form.value.email;
    const password = form.value.password;
    const password_confirmation = form.value.password_confirmation;

    let authObs: Observable<AuthResponseData>;

    this.isLoading =true;
    if(this.isLoginMode) {
      authObs = this.authService.login(email,password)

    }else {
      authObs= this.authService.signUp(email, password,password_confirmation)
    }
    authObs.subscribe((resData : AuthResponseData )=>{
        const deccodedToken = this.helper.decodeToken(resData.token);
          this.isAdmin = deccodedToken.role
          console.log(this.isAdmin);
          if(this.isAdmin =='admin'){
            this.router.navigate(['admin-dashboard'])
          }else{
            this.router.navigate(['home']);
          }
      console.log(resData);
      this.isLoading=false;
      // const token = resData.token;
      // console.log('token',token)

      // const role = this.authService.getRoleFromToken(token);
      // console.log('role',role)
      // Navigate based on the role
      // if (role === 'admin') {
      //   this.router.navigate(['admin-dashboard']);
      // } else {
      //   this.router.navigate(['home']);
      // }
    
    }, errorMessage =>{
      console.log(errorMessage);
      this.error = errorMessage
      this.isLoading=false
    }
  );

    form.reset()
  }
}
