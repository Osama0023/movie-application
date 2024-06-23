import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private route: Router) {}

  login(username: String, pass: String){
    if(username ===  'osama' && pass=== 'osama'){
      return 200;
    }else return 403;
}

logout(){
  this.route.navigate(['login'])
}


}
