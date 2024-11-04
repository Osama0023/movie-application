import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-links',
  templateUrl: './nav-links.component.html',
  styleUrl: './nav-links.component.scss'
})
export class NavLinksComponent {

  selectedLanguage: string = 'English'; // Default text
  dropdownVisible: boolean = false;

  selectLanguage(language: string) {
    this.selectedLanguage = language;
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

}
