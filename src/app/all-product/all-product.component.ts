import { Component, OnInit } from '@angular/core';
import { ProductService } from './all-product.service';
import { Category, Product } from './all-product.module';
import { SharedService } from '../shared/shared.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { CartItem } from '../header/search-bar/cart/cart.model';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AllProductComponent implements OnInit {
  productsByCategory: { [key: string]: Product[] } = {};
  products: Product[] = [];
  showNotification: boolean = false;
  categories: Category[] = [];
  selectedCategory: string | null = null;

  constructor(
    private productService: ProductService,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((categories: Category[]) => {
      this.categories = categories;

      this.route.paramMap.subscribe(params => {
        const categoryName = params.get('category');
        if (categoryName) {
          this.selectedCategory = categoryName;
          this.loadProductsByCategoryName(categoryName);
        } else {
          this.selectedCategory = null;
          this.loadAllProducts();
        }
      });
    });
  }

  loadProductsByCategoryName(categoryName: string) {
    const selectedCategory = this.categories.find(category => category.name === categoryName);
    const categoryId = selectedCategory ? selectedCategory._id : null;
    
    if (categoryId) {
      this.productService.getProductsByCategory(categoryId).subscribe((res: Product[]) => {
        this.productsByCategory = { [categoryName]: res };
      });
    }
  }

  loadAllProducts() {
    this.productService.getAllProducts().subscribe((products: Product[]) => {
      this.productsByCategory = this.groupProductsByCategory(products);
    });
  }

  groupProductsByCategory(products: Product[]): { [key: string]: Product[] } {
    const groupedProducts: { [key: string]: Product[] } = {};
    products.forEach(product => {
      const categoryName = this.categories.find(cat => cat._id === product.category._id)?.name || 'Others';
      if (!groupedProducts[categoryName]) {
        groupedProducts[categoryName] = [];
      }
      groupedProducts[categoryName].push(product);
    });
    return groupedProducts;
  }

  addToCart(event: CartItem) {
    const added = this.sharedService.addToCart(event);

    if (!added) {
      this.showNotification = true;
      setTimeout(() => {
        this.showNotification = false;
      }, 2000);
    }
  }

  applySorting(sortBy: string) {
    Object.keys(this.productsByCategory).forEach(category => {
      switch (sortBy) {
        case 'A-Z':
          this.productsByCategory[category].sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'Z-A':
          this.productsByCategory[category].sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'Price, Low To High':
          this.productsByCategory[category].sort((a, b) => Number(a.price) - Number(b.price));
          break;
        case 'Price, High To Low':
          this.productsByCategory[category].sort((a, b) => Number(b.price) - Number(a.price));
          break;
      }
    });
  }
}
