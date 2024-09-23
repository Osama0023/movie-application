import { Component } from '@angular/core';
declare var $: any; // Declare jQuery

@Component({
  selector: 'app-filter-products',
  templateUrl: './filter-products.component.html',
  styleUrl: './filter-products.component.scss'
})
export class FilterProductsComponent {


  filterVisible = false;

  toggleFilter() {
    this.filterVisible = !this.filterVisible;
  }

}
