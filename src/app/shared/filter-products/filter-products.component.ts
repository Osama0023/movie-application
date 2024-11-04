import { Component, EventEmitter, Output } from '@angular/core';
declare var $: any; // Declare jQuery

@Component({
  selector: 'app-filter-products',
  templateUrl: './filter-products.component.html',
  styleUrl: './filter-products.component.scss'
})
export class FilterProductsComponent {
  @Output() sortOptionChanged = new EventEmitter<string>();


  filterVisible = false;

  toggleFilter() {
    this.filterVisible = !this.filterVisible;
  }
  sortProducts(sortBy: string) {
    this.sortOptionChanged.emit(sortBy);
  }

}
