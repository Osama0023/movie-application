import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../all-product/all-product.module';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  categories: Category[] = [];
  emailSubscription: string = '';

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAll().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
      error => {
        console.error('Error loading categories:', error);
      }
    );
  }

  onSubscribe() {
    if (this.emailSubscription) {
      // Implement your newsletter subscription logic here
      console.log('Newsletter subscription:', this.emailSubscription);
      this.emailSubscription = ''; // Reset the input
      // You might want to add a success message or notification
    }
  }
}
