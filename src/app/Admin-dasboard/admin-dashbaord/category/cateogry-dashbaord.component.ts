import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { Category } from '../../../models/Category.model';
import { MatDialog } from '@angular/material/dialog';
import { GridApi } from 'ag-grid-community';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { AuthService } from '../../../login/auth.service';

@Component({
  selector: 'app-cateogry-dashbaord',
  templateUrl: './cateogry-dashbaord.component.html',
  styleUrl: './cateogry-dashbaord.component.scss'
})
export class CatogoryDashboardComponent {
  categoryList: Category[] = [];
  readonly dialog = inject(MatDialog);
  detailsList: Category[] = [];
  public gridApi!: GridApi;
  SelectedCategory: Category ;
  rowindex!: number;
  selectedValue: string;
  categoryForm: FormGroup ;

  constructor(private categoryService: CategoryService , private authService: AuthService) {}

  ngOnInit(): void {
    // this.categoryForm.reset();

    this.initForm();
    this.selectedValue =''
    this.categoryService.getAll().subscribe((res: Category[]) => {
      console.log('all products', res);
      this.categoryList = res;
    });

  }

  initForm(){
    this.categoryForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
    })

  }
  filterCategory(event: any) {
    let selectedValue  = event.value;
    console.log(selectedValue );
  
    this.categoryService.getCategoryById(this.selectedValue).subscribe((res: Category) => {
      console.log('Fetched Category:', res);
  
      // Patch the form with the fetched category data
      this.categoryForm.patchValue({
        id: res._id,
        name: res.name,
      });
  
      console.log('Updated Form:', this.categoryForm.value);
  
      // Update the grid data with the selected category
      if (this.gridApi) {
        this.gridApi.setRowData([this.SelectedCategory]);
      }
    });
  }
  

 
  AddCategory(){
    this.categoryService
    .save(this.categoryForm.value)
    .subscribe((data) => {
    });

  }

  updateCategory(){
    this.categoryService
    .update(this.selectedValue,
      this.categoryForm.controls['name'].value)
    .subscribe((data) => {
      console.log(data)
    });

  }

  newData() {
    this.initForm();
    this.selectedValue =''
  }
  mesgDelete() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteCategory();
        this.ngOnInit();
        Swal.fire('Deleted!', 'Your record has been deleted.', 'success');
      } else if (result.isDenied) {
        Swal.fire('Not Deleted!', 'Your record is safe.', 'error');
      }
    });
  }
  msgSave() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will add this category",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Save it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.AddCategory();
        this.ngOnInit();
        Swal.fire('Saved!', 'Your record has been Saved.', 'success');
      } else if (result.isDenied) {
        Swal.fire('Not Saved!', 'error');
      }
    });
  }
  msgUpdate() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will update this category",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Updated!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.updateCategory();
        this.ngOnInit();
        Swal.fire('Saved!', 'Your record has been Updated.', 'success');
      } else if (result.isDenied) {
        Swal.fire('Not Updated!', 'error');
      }
    });
  }
  deleteCategory() {
    console.log('ddddddd',this.categoryForm.controls['id'].value)
    this.categoryService
      .delete(this.selectedValue)
      .subscribe();
  }
}
