import { Component, inject } from '@angular/core';
import { Product } from '../../../../all-product/all-product.module';
import { MatDialog } from '@angular/material/dialog';
import { CellClickedEvent, CellKeyDownEvent, ColDef, FullWidthCellKeyPressEvent, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Category } from '../../../../models/Category.model';
import { ProductService } from '../../../../all-product/all-product.service';
import { CategoryService } from '../../../../services/category.service';
import { GridEditIconComponent } from '../../../../shared/grid-edit-icon/grid-edit-icon/grid-edit-icon.component';
import Swal from 'sweetalert2';
import tinycolor from 'tinycolor2';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrl: './product-dashboard.component.scss'
})
export class ProductDashboardComponent {
  ProductList: Product[] = [];
  readonly dialog = inject(MatDialog);
  detailsList: Product[] = [];
  public gridApi!: GridApi;
  SelectedProduct: Product ;
  rowindex!: number;
  selectedValue: string;
  ProductForm: FormGroup ;
  categoryList:Category[] =[]
  color: string= '#03fc66'
  colorSelected: string[] = []; // Initialize as an empty array
  constructor(private productService: ProductService , private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.selectedValue=''
    this.initForm();
    this.categoryService.getAll().subscribe((res: Category[]) => {
      console.log('all category', res);
      this.categoryList = res;
    });
    this.productService.getAllProducts().subscribe((res:Product[]) => {
      console.log('llllll',res);
      this.ProductList=res
      console.log('this.ProductList', this.ProductList)
      this.gridApi.setRowData(this.ProductList);

    })
}

initForm() {
  this.ProductForm = new FormGroup({
    name: new FormControl<string>(''),
    description: new FormControl<string>(''),
    price: new FormControl<number | null>(null),
    category: new FormGroup({
      categoryId: new FormControl<string>(''), // Changed to string
      categoryName: new FormControl<string>(''), // Changed to string
    }),
    image: new FormControl<string>(''),
    // colors: new FormControl<string[]>(['']),
    colors: new FormArray([
      this.createColorGroup()  // Start with one color group
    ]),

    thumbnails: new FormControl<string[]>(['']),
    productId: new FormControl<string>(''),
    sale: new FormGroup({
      discountPercentage: new FormControl<number | null>(null),
      saleEndDate: new FormControl< string>(''),
    }),
  });
  this.ProductForm.get('category.categoryId')?.disable(); // Disable categoryId
  this.ProductForm.get('category.categoryName')?.disable(); // Disable categoryName

}
// Create a form group for color
createColorGroup(): FormGroup {
  return new FormGroup({
    colorName: new FormControl<string>(''), // Color name as string
    quantity: new FormControl<number>(0), // Quantity as number
  });
}

// Get colors as FormArray
get colors(): FormArray {
  return this.ProductForm.get('colors') as FormArray;
}

// Method to add a new color to the colors array
addColor() {
  this.colors.push(this.createColorGroup());
}

// Method to remove a color at a specific index
removeColor(index: number) {
  this.colors.removeAt(index);
}



  getColorNameFromHex(hex: string): string {
    const color = tinycolor(hex);
    console.log('ddddd',color.toName())

    return color.toName() || 'Unknown color';
  }
  

  onCategorySelectionChange(event: any) {
    // Get the selected category ID
    this.selectedValue = event.value;
    
    // Find the category object based on selectedValue (category ID)
    const selectedCategory = this.categoryList.find(category => category._id === this.selectedValue);
    
    // Patch the form with both categoryId and categoryName
    this.ProductForm.patchValue({
      category: {
        categoryId: this.selectedValue,
        categoryName: selectedCategory ? selectedCategory.name : '' // Set categoryName if found
        },

    });
  
    // Fetch products by selected category
    this.productService.getProductsByCategory(this.selectedValue).subscribe((res: Product[]) => {
      this.ProductList = res;
      console.log('this.ProductList',this.ProductList)
      this.gridApi.setRowData(this.ProductList);
    });
  }
  

  // Column Definitions: Defines the columns to be displayed.
  columnDefs: ColDef[] = [
    {
      headerName: 'Select',
      field: 'edit',
      minWidth: 100,
      maxWidth: 120,
      cellRenderer: 'editButton',
    },
    {
      headerName: 'Product ID',
      field: '_id',
      minWidth: 140,
      flex: 1,
    },
    {
      headerName: 'Product Name',
      field: 'name',
      minWidth: 300,
      flex: 2,
    },
    {
      headerName: 'Product Description',
      field: 'description',
      minWidth: 300,
      flex: 2,
    },
    {
      headerName: 'Price',
      field: 'price',
      minWidth: 150,
      flex: 1,
    },
    {
      headerName: 'Category ID',
      field: 'category._id', // Accessing the category ID directly
      minWidth: 150,
      flex: 1,
    },
    {
      headerName: 'Category Name',
      field: 'category.name', // Accessing the category name directly
      minWidth: 200,
      flex: 2,
    },
    {
      headerName: 'Colors',
      field: 'colors',
      minWidth: 200,
      flex: 2,
      valueGetter: (params) => {
        if (!params.data.colors) return '';
        return params.data.colors.map((color: any) => 
          `${color.colorName}: ${color.quantity}`
        ).join(', ');
      }
    },
    {
      headerName: 'Discount',
      field: 'sale.discountPercentage',
      minWidth: 150,
      flex: 1,
      cellRenderer: (params: any) => {
        if (!params.data.sale?.discountPercentage) return '';
        return `<div class="discount-badge">-${params.data.sale.discountPercentage}%</div>`;
      }
    },
    {
      headerName: 'Sale End Date',
      field: 'sale.saleEndDate',
      minWidth: 200,
      flex: 1,
      cellRenderer: (params: any) => {
        if (!params.data.sale?.saleEndDate) return '';
        const endDate = new Date(params.data.sale.saleEndDate);
        const today = new Date();
        const isExpired = endDate < today;
        
        return `<div class="sale-date ${isExpired ? 'expired' : 'active'}">
                  ${endDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>`;
      }
    },
  ];
  

  public defaultColDef: ColDef = {
    resizable: true,
    filter: true,
  };

  gridOptions: GridOptions = {
    columnDefs: this.columnDefs,
    defaultColDef: this.defaultColDef,
    pagination: true,
    domLayout: 'autoHeight',
    frameworkComponents: {
      editButton: GridEditIconComponent,
      // deleteButton: GridDeleteIconComponent,
    },
    enableCellChangeFlash: true,
    rowData: this.ProductList, // Bind rowData directly to the grid options
    onGridReady: (params: GridReadyEvent) => {
      this.gridApi = params.api;
    },
    onCellClicked: (event: CellClickedEvent) => {
      if (event.column.getColId() === 'edit') {
        this.SelectedProduct = event.data;
  
        // Clear existing color controls
        while (this.colors.length) {
          this.colors.removeAt(0);
        }
  
        // Add color controls for each existing color
        if (this.SelectedProduct.colors && this.SelectedProduct.colors.length) {
          this.SelectedProduct.colors.forEach((color: any) => {
            this.colors.push(new FormGroup({
              colorName: new FormControl(color.colorName),
              quantity: new FormControl(color.quantity)
            }));
          });
        } else {
          // Add one empty color group if no colors exist
          this.colors.push(this.createColorGroup());
        }
  
        // Patch the rest of the form
        this.ProductForm.patchValue({
          name: this.SelectedProduct.name,
          price: this.SelectedProduct.price,
          description: this.SelectedProduct.description,
          category: {
            categoryId: this.SelectedProduct.category?._id || null,
            categoryName: this.SelectedProduct.category?.name || null,
          },
          productId: this.SelectedProduct._id,
          sale: {
            discountPercentage: this.SelectedProduct.sale?.discountPercentage || null,
            saleEndDate: this.SelectedProduct.sale?.saleEndDate ? 
              new Date(this.SelectedProduct.sale.saleEndDate).toISOString().split('T')[0] : null,
          },
        });
  
        this.rowindex = Number(event.rowIndex);
      }
    },
  };
  

  refreshData() {
    this.gridApi.setRowData(this.ProductList);
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
        this.deleteProduct();
        this.ngOnInit();
        Swal.fire('Deleted!', 'Your record has been deleted.', 'success');
      } else if (result.isDenied) {
        Swal.fire('Not Deleted!', 'Your record is safe.', 'error');
      }
    });
  }
  
  msgSave() {
    // Format the form data before sending
    const formData = {
      ...this.ProductForm.value,
      colors: this.colors.value, // This will now properly include colorName and quantity
      sale: {
        ...this.ProductForm.value.sale,
        saleEndDate: this.ProductForm.value.sale.saleEndDate ? 
          new Date(this.ProductForm.value.sale.saleEndDate).toISOString() : null
      }
    };

    Swal.fire({
      title: 'Are you sure?',
      text: "You will add this product",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Save it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.save(this.selectedValue, formData).subscribe(
          (data) => {
            Swal.fire('Saved!', 'Your record has been saved.', 'success');
            this.ngOnInit();
          },
          (error) => {
            Swal.fire('Error!', 'There was an error saving the product: ' + error.message, 'error');
          }
        );
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
        console.log('this.SelectedProduct._id',this.SelectedProduct._id)
        console.log('this.selectedValue',this.selectedValue)
        console.log('this.ProductForm.value',this.ProductForm.value)
        this.productService.updateProduct( this.SelectedProduct.category._id,this.SelectedProduct._id, this.ProductForm.value).subscribe(
          (data) => {
            // Success case
            Swal.fire('Saved!', 'Your record has been updated.', 'success');
            this.ngOnInit(); // Reload data
          },
          (error) => {
            console.log('this.ProductForm',this.ProductForm.value)
            // Error case
            Swal.fire('Error!', 'There was an error saving the product: ' + error.message, 'error');
          }
        );
      }
    });
  }
  
  deleterow(index: number) {
    this.ProductList.splice(index, 1);
    this.refreshData();
  }
  saveProduct(){
    console.log('this.selectedValue', this.ProductForm.value)
    console.log('this.ProductForm.value', this.ProductForm.value)

    this.productService
    .save(this.ProductForm.value ,this.ProductForm.value)
    .subscribe((data) => {
console.log(data)   
 });

  }
  newData() {
    this.ngOnInit()
  }
 
  deleteProduct() {
    console.log('ddddddd',this.selectedValue)
    const categoryId = this.ProductForm.get('category.categoryId')?.value;

    this.productService
      .delete(this.SelectedProduct._id,categoryId)
      .subscribe();
      this.ngOnInit()
  }
}
