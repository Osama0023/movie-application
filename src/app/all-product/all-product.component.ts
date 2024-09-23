import { Component, OnInit } from '@angular/core';
import { AllProductService } from './all-product.service';
import { Product } from './all-product.module';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrl: './all-product.component.scss'
})

export class AllProductComponent implements OnInit{
  products:Product[] = [];

  constructor(private allProductsService : AllProductService){}
  ngOnInit(): void {
    this.allProductsService.getAll().subscribe((res:Product[]) =>{
      console.log('all products' , res);
      this.products = res
    })
  }
}
