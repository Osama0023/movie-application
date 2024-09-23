import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private router: Router, private auth: AuthService){
  }

  selectedLanguage: string = 'English'; // Default text
  dropdownVisible: boolean = false;

  selectLanguage(language: string) {
    this.selectedLanguage = language;
  }
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }
  
}
