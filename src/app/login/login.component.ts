import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading =false;
  error: string  =null;

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
      console.log(resData);
      this.isLoading=false;
      this.router.navigate(['home'] )
    }, errorMessage =>{
      console.log(errorMessage);
      this.error = errorMessage
      this.isLoading=false
    }
  );

    form.reset()
  }
}
