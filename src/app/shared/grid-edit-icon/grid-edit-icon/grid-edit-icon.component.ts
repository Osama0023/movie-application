import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-grid-edit-icon',
  templateUrl: './grid-edit-icon.component.html',
  styleUrls: ['./grid-edit-icon.component.scss']
})
export class GridEditIconComponent implements OnInit, ICellRendererAngularComp {

  constructor() { }
  refresh(params: any): boolean {
    
    return true;
  }
  agInit(params: any): void {
  }
  ngOnInit(): void {
  }

}
