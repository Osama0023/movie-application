import { Component, OnInit } from '@angular/core';
import { Category } from '../models/Category.model';
import { CategoryService } from '../services/category.service';
import { SharedService } from '../shared/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../all-product/all-product.service';
import { Product } from '../all-product/all-product.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  dropdownVisible: boolean = false;
  categoryList: Category[] = [];
  selectedValue: string ='';
  ProductList: Product[] = [];
  constructor(
    private categoryService: CategoryService,
    private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((res: Category[]) => {
      this.categoryList = res;
    });

    // Subscribe to cart and wishlist counts
   
  }
  onCategorySelectionChange(event: any) {
    this.selectedValue = event.value;
    // Find the selected category by ID to get the name
    const selectedCategory = this.categoryList.find(category => category._id === this.selectedValue);
    const categoryName = selectedCategory ? selectedCategory.name : '';
  
    // Use the router to navigate to the new URL with the category name
    if (categoryName) {
      this.router.navigate(['/home', categoryName]);
    }
  }

  toggleDropdownn(event: Event) {
    event.preventDefault(); // Prevent default anchor behavior
    this.dropdownVisible = !this.dropdownVisible; // Toggle dropdown visibility
  }
}
