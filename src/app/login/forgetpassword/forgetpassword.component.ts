import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent implements OnInit{

  constructor(private authService : AuthService){}

  ngOnInit(): void {
    
  }

  forgetPaswword(){
    
  }
}
