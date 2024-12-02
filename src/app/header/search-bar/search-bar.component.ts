import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements OnInit {
  cartCount: number = 0;
  wishlistCount: number = 0;
  isLoggedIn: boolean = false;

  constructor(
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sharedService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

    this.sharedService.wishlistCount$.subscribe(count => {
      this.wishlistCount = count;
    });
    
    // Check if token exists
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const token = localStorage.getItem('userData');
    this.isLoggedIn = !!token;
  }

  onUserIconClick() {
    if (this.isLoggedIn) {
      this.router.navigate(['/my-account']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
