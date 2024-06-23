import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username ='';
  password ='';
  errMsg ='';

  constructor(private auth: AuthService, private router: Router){}

  login() {
    if (this.username.trim().length === 0) {
        this.errMsg = "Username is required";
    } else if (this.password.trim().length === 0) {
        this.errMsg = "Password is required";
    } else {
        this.errMsg = "";
        let response = this.auth.login(this.username,this.password)
        if(response === 200){
          this.router.navigate(['home']);
        }if(response === 403){
          this.errMsg = "Invalid Usernam Or Password";
        }
        }
        
    }


}

