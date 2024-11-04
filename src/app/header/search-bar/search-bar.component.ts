import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements OnInit {
  cartCount: number = 0;
  wishlistCount: number = 0;

  constructor(
    private sharedService: SharedService,

   ){}
  ngOnInit(): void {
    this.sharedService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

    this.sharedService.wishlistCount$.subscribe(count => {
      this.wishlistCount = count;
    });
  }

}
