import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-links',
  templateUrl: './nav-links.component.html',
  styleUrl: './nav-links.component.scss'
})
export class NavLinksComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Subscribe to auth state changes
    this.authService.user.subscribe(user => {
      this.isLoggedIn = !!JSON.parse(localStorage.getItem('userData'));
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }
}
