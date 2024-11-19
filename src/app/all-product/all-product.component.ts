import { Component, OnInit, HostListener } from '@angular/core';
import { ProductService } from './all-product.service';
import { Category, Product } from './all-product.module';
import { SharedService } from '../shared/shared.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { CartItem } from '../header/search-bar/cart/cart.model';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { filter } from 'rxjs/operators';

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
  selectedValue: string ='';
  isDropdownOpen = false;
  selectedCategoryName: string = '';
  isSortDropdownOpen = false;
  selectedSortOption: string = '';
  sortOptions: string[] = [
    'A-Z',
    'Z-A',
    'Price, Low To High',
    'Price, High To Low'
  ];
  breadcrumbs: { label: string; url: string }[] = [];

  constructor(
    private productService: ProductService,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router,
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.breadcrumbs = this.createBreadcrumbs(this.route.root);
    });
  }

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

  // navigateToProductDetails(product: Product) {
  //   // Navigate to Prod1uctDetailsComponent and pass product data as state
  //   console.log('ddddddd',product)
  //   this.router.navigate(['/product-details'], { state: { product } });
  // }

  onCategorySelectionChange(event: any) {
    this.selectedValue = event.value;
    // Find the selected category by ID to get the name
    const selectedCategory = this.categories.find(category => category._id === this.selectedValue);
    const categoryName = selectedCategory ? selectedCategory.name : '';
  
    // Use the router to navigate to the new URL with the category name
    if (categoryName) {
      this.router.navigate(['/home', categoryName]);
    }
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
      console.log('a7aaa',products)
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

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectCategory(category: any) {
    this.selectedValue = category._id;
    this.selectedCategoryName = category.name;
    this.isDropdownOpen = false;
    
    // Use your existing selection change logic
    const event = {
      value: category._id
    };
    this.onCategorySelectionChange(event);
  }

  toggleSortDropdown() {
    this.isSortDropdownOpen = !this.isSortDropdownOpen;
    if (this.isSortDropdownOpen) {
      this.isDropdownOpen = false; // Close category dropdown if open
    }
  }

  selectSortOption(option: string) {
    this.selectedSortOption = option;
    this.isSortDropdownOpen = false;
    this.applySorting(option);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const categoryDropdown = document.querySelector('.custom-dropdown:not(.sort-dropdown)');
    const sortDropdown = document.querySelector('.sort-dropdown');
    
    if (categoryDropdown && !categoryDropdown.contains(event.target as Node)) {
      this.isDropdownOpen = false;
    }
    
    if (sortDropdown && !sortDropdown.contains(event.target as Node)) {
      this.isSortDropdownOpen = false;
    }
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: { label: string; url: string }[] = []): { label: string; url: string }[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      // Add route label to breadcrumbs
      if (child.snapshot.data['breadcrumb']) {
        breadcrumbs.push({
          label: child.snapshot.data['breadcrumb'],
          url: url
        });
      }

      // If there's a category parameter, add it to breadcrumbs
      const categoryName = child.snapshot.paramMap.get('category');
      if (categoryName) {
        breadcrumbs.push({
          label: categoryName,
          url: url
        });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

  navigateTo(url: string): void {
    this.router.navigate([url]);
  }
}
